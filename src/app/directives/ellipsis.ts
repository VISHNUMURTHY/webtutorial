import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  Output,
  EventEmitter,
  NgZone,
  HostListener,
  OnChanges,
  AfterViewInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import elementResizeDetectorMaker from 'element-resize-detector';
import { isPlatformBrowser } from '@angular/common';

/**
 * Directive to truncate the contained text, if it exceeds the element's boundaries
 * and append characters (configurable, default '...') if so.
 */
@Directive({
  selector: '[ellipsis]'
})
export class EllipsisDirective implements OnChanges, AfterViewInit {
  /**
   * Instance of https://github.com/wnr/element-resize-detector
   */
  private static elementResizeDetector: elementResizeDetectorMaker.Erd = null;

  /**
   * The original text (not truncated yet)
   */
  private originalText: string;

  /**
   * The referenced element
   */
  private elem: any;

  /**
   * Inner div element (will be auto-created)
   */
  private innerElem: any;

  /**
   * Anchor tag wrapping the `ellipsisCharacters`
   */
  private moreAnchor: HTMLAnchorElement;

  /**
   * Whether the ellipsis should be applied on window resize
   */
  private applyOnWindowResize = false;
  /**
   * The ellipsis html attribute
   * If anything is passed, this will be used as a string to append to
   * the truncated contents.
   * Else '...' will be appended.
   */
  @Input('ellipsis') ellipsisCharacters: string;

  /**
   * The ellipsis-content html attribute
   * If passed this is used as content, else contents
   * are fetched from textContent
   */
  @Input('ellipsis-content') ellipsisContent: string | number = null;

  @Output('ellipsis-click-more') moreClickEmitter: EventEmitter<MouseEvent> = new EventEmitter();

  /**
   * The ellipsis-change html attribute
   * This emits after which index the text has been truncated.
   * If it hasn't been truncated, null is emitted.
   */
  @Output('ellipsis-change') changeEmitter: EventEmitter<number> = new EventEmitter();

  /**
   * Utility method to quickly find the largest number for
   * which `callback(number)` still returns true.
   * @param  max      Highest possible number
   * @param  callback Should return true as long as the passed number is valid
   * @return          Largest possible number
   */
  private static numericBinarySearch(max: number, callback: (n: number) => boolean): number {
    let low = 0;
    let high = max;
    let best = -1;
    let mid: number;

    while (low <= high) {
      mid = ~~((low + high) / 2);
      const result = callback(mid);
      if (!result) {
        high = mid - 1;
      } else {
        best = mid;
        low = mid + 1;
      }
    }
    return best;
  }

  private static convertEllipsisInputToString(input: string | number): string {
    if (typeof input === 'undefined' || input === null) {
      return '';
    }
    return String(input);
  }

  /**
   * The directive's constructor
   */
  public constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2, private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // let the ellipsis characters default to '...':
    if (this.ellipsisCharacters === '') {
      this.ellipsisCharacters = '...';
    }

    // create more anchor element:
    this.moreAnchor = <HTMLAnchorElement> this.renderer.createElement('a');
    this.moreAnchor.className = 'comment-more';
    this.moreAnchor.href = '#';
    //this.moreAnchor.innerText = this.ellipsisCharacters;
    this.moreAnchor.innerText = 'More';
    // store the original contents of the element:
    this.elem = this.elementRef.nativeElement;
    if (typeof this.ellipsisContent !== 'undefined' && this.ellipsisContent !== null) {
      this.originalText = EllipsisDirective.convertEllipsisInputToString(this.ellipsisContent);
    } else if (!this.originalText) {
      this.originalText = this.elem.textContent.trim();
    }

    this.innerElem = <HTMLDivElement> this.renderer.createElement('div');
    const text = this.renderer.createText(this.originalText);
    this.renderer.appendChild(this.innerElem, text);
    this.renderer.appendChild(this.elem, this.innerElem);

    this.applyEllipsis();
  }

  ngOnChanges() {
    if (!this.elem
      || typeof this.ellipsisContent === 'undefined'
      || this.originalText === EllipsisDirective.convertEllipsisInputToString(this.ellipsisContent)) {
      return;
    }

    this.originalText = EllipsisDirective.convertEllipsisInputToString(this.ellipsisContent);
    this.applyEllipsis();
  }

  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    this.ngZone.run(() => {
      if (this.applyOnWindowResize) {
        this.applyEllipsis();
      }
    });
  }

  /**
   * Get the original text's truncated version. If the text really needed to
   * be truncated, this.ellipsisCharacters will be appended.
   * @param max the maximum length the text may have
   * @return string       the truncated string
   */
  private getTruncatedText(max: number): string {
    if (!this.originalText || this.originalText.length <= max) {
      return this.originalText;
    }

    const truncatedText = this.originalText.substr(0, max - 1);
    return truncatedText;
  }

  /**
   * Set the truncated text to be displayed in the inner div
   * @param max the maximum length the text may have
   * @param addMoreListener=false listen for click on the ellipsisCharacters anchor tag if the text has been truncated
   * @returns length of remaining text (excluding the ellipsisCharacters, if they were added)
   */
  private truncateText(max: number, addMoreListener = false): number {
    let text = this.getTruncatedText(max);
    const truncatedLength = text.length;
    const textTruncated = (truncatedLength !== this.originalText.length);

    text += '... ';

    this.renderer.setProperty(this.innerElem, 'textContent', text);

    if (textTruncated) {
      this.renderer.appendChild(this.innerElem, this.moreAnchor);
    }

    return truncatedLength;
  }

  /**
   * Display ellipsis in the inner div if the text would exceed the boundaries
   */
  public applyEllipsis() {

    // Find the best length by trial and error:
    const maxLength = EllipsisDirective.numericBinarySearch(this.originalText.length, curLength => {
      this.truncateText(curLength);
      return !this.isOverflowing;
    });

    // Apply the best length:
    const finalLength = this.truncateText(maxLength);

    // Emit change event:
    if (this.changeEmitter.observers.length > 0) {
      this.changeEmitter.emit(
        (this.originalText.length === finalLength) ? null : finalLength
      );
    }
  }
  /**
   * Whether the text is exceeding the element's boundaries or not
   */
  private get isOverflowing(): boolean {
    // Enforce hidden overflow (required to compare client width/height with scroll width/height)
    const currentOverflow = this.elem.style.overflow;
    if (!currentOverflow || currentOverflow === 'visible') {
      this.elem.style.overflow = 'hidden';
    }
    const isOverflowing = this.elem.clientWidth < this.elem.scrollWidth - 1 || this.elem.clientHeight < this.elem.scrollHeight - 1;

    // Reset overflow to the original configuration:
    this.elem.style.overflow = currentOverflow;

    return isOverflowing;
  }
}