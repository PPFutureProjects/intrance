import { Component } from '@angular/core';
import { NavController ,NavParams ,ViewController} from 'ionic-angular';

/*
  Generated class for the Finalise page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-finalise',
  templateUrl: 'finalise.html'
})
export class FinalisePage {
  entity:any={};
  stape="first";
  submitted = false;
  round: boolean;
  expand: boolean;
  
  constructor(
  public navCtrl: NavController,
  public navParams:NavParams, 
  public viewCtrl: ViewController,) {
    
    this.entity=this.navParams.get('entity');
    this.entity.payementProcess={mode:'orange-money'};
  }

  ionViewDidLoad() {
    console.log('Hello FinalisePage Page');
     
  }
 setClass() {
    let classes = {
      round: this.round,
      expand: this.expand
    };
    return classes;
  }
isInvalid() {
      if (this.stape=='first') {
        switch (this.entity.payementProcess.mode) {
          case 'orange-money':
            return !this.entity.payementProcess.orangeMobileTel;
         case 'mtn-mobile-money':
            return !this.entity.payementProcess.mtnMobileTel;
          default:
            return true;
        }
           
      } else if (this.stape=='second') {
           return !this.entity.payementProcess.transactionId || this.entity.payementProcess.confirmMsgReceived;
      }    
  }

  goBack() {
      if (this.stape=='first') {
          // this.entity.payementProcess=null;
           //dismiss
      } else {
         this.stape='first';
      }    
   }

     goToFirst() {
       this.stape='first';
     }

ussd(){
  if(this.entity.payementProcess.mode=='orange-money')
     return '#150*1*1*694210203*'+this.entity.budget+'#';
  else  if(this.entity.payementProcess.mode=='mtn-mobile-money')
     return this.entity.payementProcess.reference? '*126*1*1*1*679937241*'+this.entity.budget+'*'+this.entity.payementProcess.reference+'#':'*126*1*1*1*679937241*'+this.entity.budget+'#';
}


   nextStape() {
     if (this.stape=='first') {
           this.stape='second';
      } else {
         //save ;
      }    
  } 

dismiss(data?:any) {
      this.viewCtrl.dismiss(data);
  }   
}
