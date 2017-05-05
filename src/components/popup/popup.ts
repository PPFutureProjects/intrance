import { Component, Input } from '@angular/core';

/*
  Generated class for the Popup component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'popup',
  templateUrl: 'popup.html'
})
export class PopupComponent {
 isClosed:boolean=false;
 @Input()
  option: string;
  @Input()
  question:any;
  constructor() {
    console.log('Hello Popup Component');
    
  }

}
