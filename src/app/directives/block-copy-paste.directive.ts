import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[web-BlockCopyPaste]'
})
export class BlockCopyPasteDirective {
  constructor() { }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
    alert("Paste option is disabled.");
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
    alert("Copy option is disabled.");
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
    alert("Cut option is disabled.");
  }
}