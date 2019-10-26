import { Directive, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter()
  
  constructor(public el: ElementRef) { }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    try {

      const topValue = event.target.scrollTop
      const height = this.el.nativeElement.scrollHeight
      const offset = this.el.nativeElement.offsetHeight

      // emit bottom event
      if (topValue > height - offset - 1) {
        this.scrollPosition.emit('bottom')
      }

      // emit top event
      if (topValue === 0) {
        this.scrollPosition.emit('top')
      }

    } catch (err) {
      console.log(err);
    }
  }

}