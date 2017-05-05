import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController } from 'ionic-angular';
import { FinalisePage } from '../finalise/finalise';
import { MatieresPage } from '../matieres/matieres';
import { Storage } from '@ionic/storage';
import { AngularFire, AngularFireAuth } from 'angularfire2';
/*
  Generated class for the ConcoursOptions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-concours-options',
  templateUrl: 'concours-options.html'
})
export class ConcoursOptionsPage {
 concours:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,    public af: AngularFire,
     public storage: Storage ) {
    this.concours=this.navParams.get('concours');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConcoursOptionsPage');
  }

explorer(){
   if(this.concours.matieres.length)
   this.navCtrl.push(MatieresPage,{concours:this.concours})  ;
}

inscrire(){
let modal=this.modalCtrl.create(FinalisePage,{entity:{}});
modal.onDidDismiss((data)=>{
  //this.dataService.getQuestionsTest(this.concours);
          this.concours.payementProcess=data;
         this.storage.set('_default_concours',this.concours);
})
modal.present();
}

}
