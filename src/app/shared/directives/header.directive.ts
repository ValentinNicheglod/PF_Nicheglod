import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[header]'
})
export class HeaderDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', '20px');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#3DB1C8');
  }

}
