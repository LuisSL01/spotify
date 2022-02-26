import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  @Input() customImg:string|boolean =false;
  @HostListener('error') handleError():void{
    const elNative = this.elHost.nativeElement;
    
    if(this.customImg){
      elNative.src = this.customImg;
    }else{
      elNative.src = '/assets/images/image-broker.png';
    }
  }

  constructor(private elHost:ElementRef) {    
   }

}
