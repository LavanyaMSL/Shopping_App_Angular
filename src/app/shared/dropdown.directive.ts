import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";
@Directive({
    selector:'[appDropDown]'
})
export class DropdownDirective{
    constructor(private elRef:ElementRef,private renderer:Renderer2){}
// @HostListener('click') onClick(event:Event){
//     if(this.elRef.nativeElement.classList.contains('open'))  
//          this.renderer.removeClass(this.elRef.nativeElement,"open");
// else
// this.renderer.addClass(this.elRef.nativeElement,"open");
// }
@HostBinding('class.open') isOpen=false;
// @HostListener('click') toggleOpen(){
// this.isOpen=!this.isOpen;
// }
@HostListener('document:click',['$event']) toggleOpen(event:Event){
    this.isOpen=this.elRef.nativeElement.contains(event.target)?!this.isOpen:false;
    }
}