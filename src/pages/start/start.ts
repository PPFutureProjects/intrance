import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController,ViewController} from 'ionic-angular';
import { ScorePage } from '../score/score';
import { Storage } from '@ionic/storage';
import { AnalysePage } from '../analyse/analyse';
/*
  Generated class for the Start page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {
  partie:any={};

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams, public storage: Storage,
  public modalCtrl: ModalController,
  public viewCtrl: ViewController,
  ) {
   this.partie= this.navParams.get('partie');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

start(){
  this.navCtrl.push(ScorePage,{partie:this.partie}) ;


}
/** Compare le score et le temps de reponse */
showAnalyse(){
 let modal= this.modalCtrl.create(AnalysePage, {partie:this.partie})  ;
  modal.onDidDismiss(data => {
    if(data=='info')
      this.navCtrl.push(StartPage,{partie:this.partie})
   });
  modal.present();
}

dismiss(data?:any) {
      this.viewCtrl.dismiss(data);
  } 
}
