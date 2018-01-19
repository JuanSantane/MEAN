import { Directive, HostListener,
  HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class SelectedItemDirective {
  @HostBinding('class.open') wasSelected = false;
  @HostBinding('style.background') background = 'transparent';

  constructor(item: ElementRef, renderer: Renderer2) {
   // item.nativeElement.style.backgroundColor = 'yellow';
  //  renderer.setStyle(item.nativeElement, 'background', 'green');
 }


  @HostListener('click') toggleOpen() {
    this.wasSelected = !this.wasSelected;
    this.background = 'red';
  }

  @HostListener('mouseenter') turnOnBackground() {
    this.background = 'blue';
  }
  @HostListener('mouseleave') turnOffBackground() {
    if (this.wasSelected ) {
      this.background = 'red';
    }else {
      this.background = 'transparent';
    }
  }

}
