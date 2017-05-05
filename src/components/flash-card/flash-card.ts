import { Component, Input } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import {Events } from 'ionic-angular';
@Component({
  selector: 'flash-card',
  templateUrl: 'flash-card.html'
})
export class FlashCardComponent {
 connected:boolean=false;
  @Input('isFlipped') flipCard: boolean;

  constructor( public af: AngularFire,public events: Events) {
    this.events.subscribe('connection:state',(data)=>{
    this.connected=data;
    })
  
  }  

}
