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
import { isPlatformBrowser } from '@angular/common';

/**
 * Directive to truncate the contained text, if it exceeds the element's boundaries
 * and append characters (configurable, default '...') if so.
 */
@Directive({
  selector: '[ellipsis]'
})
export class EllipsisDirective implements OnChanges, AfterViewInit {

  private originalText: string;
  private elem: any;
  private innerElem: any;
  private anchorElement: HTMLAnchorElement;

  @Input('ellipsis') ellipsisCharacters: string;

  @Input('ellipsis-content') ellipsisContent: string | number = null;

  private static FitSearch(max: number, callback: (n: number) => boolean): number {
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

  private static convertInputToString(input: string | number): string {
    if (typeof input === 'undefined' || input === null) {
      return '';
    }
    return String(input);
  }

  public constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2, private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.ellipsisCharacters === '') {
      this.ellipsisCharacters = '...';
    }

    this.anchorElement = <HTMLAnchorElement> this.renderer.createElement('a');
    this.anchorElement.className = 'comment-more';
    this.anchorElement.href = '#';
    this.anchorElement.innerText = this.ellipsisCharacters;
    this.elem = this.elementRef.nativeElement;
    if (typeof this.ellipsisContent !== 'undefined' && this.ellipsisContent !== null) {
      this.originalText = EllipsisDirective.convertInputToString(this.ellipsisContent);
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
      || this.originalText === EllipsisDirective.convertInputToString(this.ellipsisContent)) {
      return;
    }

    this.originalText = EllipsisDirective.convertInputToString(this.ellipsisContent);
    this.applyEllipsis();
  }

  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    this.ngZone.run(() => {
      this.applyEllipsis();
    });
  }

  private getTruncatedText(max: number): string {
    if (!this.originalText || this.originalText.length <= max) {
      return this.originalText;
    }

    const truncatedText = this.originalText.substr(0, max - 1);
    return truncatedText;
  }

  private truncateText(max: number, addMoreListener = false): number {
    let text = this.getTruncatedText(max);
    const truncatedLength = text.length;
    const textTruncated = (truncatedLength !== this.originalText.length);

    text += '... ';

    this.renderer.setProperty(this.innerElem, 'textContent', text);

    if (textTruncated) {
      this.renderer.appendChild(this.innerElem, this.anchorElement);
    }

    return truncatedLength;
  }

  public applyEllipsis() {

    const maxLength = EllipsisDirective.FitSearch(this.originalText.length, curLength => {
      this.truncateText(curLength);
      return !this.isOverflowing;
    });

    this.truncateText(maxLength);

  }

  private get isOverflowing(): boolean {
    const currentOverflow = this.elem.style.overflow;
    if (!currentOverflow || currentOverflow === 'visible') {
      this.elem.style.overflow = 'hidden';
    }
    const isOverflowing = this.elem.clientWidth < this.elem.scrollWidth - 1 || this.elem.clientHeight < this.elem.scrollHeight - 1;

    this.elem.style.overflow = currentOverflow;

    return isOverflowing;
  }
}