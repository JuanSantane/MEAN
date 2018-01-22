import { Directive, HostListener,
  HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class SelectedItemDirective {
  @HostBinding('class.open') selected = false;
  @HostBinding('style.background') background = 'transparent';

  constructor(item: ElementRef, renderer: Renderer2) {
   // item.nativeElement.style.backgroundColor = 'yellow';
  //  renderer.setStyle(item.nativeElement, 'background', 'green');
 }


  @HostListener('click') toggleOpen() {
    this.selected = !this.selected;
    this.background = '#CECEF6';
  }

  @HostListener('mouseenter') turnOnBackground() {
    this.background = '#CECEF6';
  }
  @HostListener('mouseleave') turnOffBackground() {
    this.background = this.selected ? '#CECEF6' :  'transparent';
  }

}
