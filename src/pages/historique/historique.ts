import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { Manager } from '../../providers/manager';
/*
  Generated class for the Historique page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html'
})
export class HistoriquePage {
  question:any;
  option:any;
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams ,
  public viewCtrl: ViewController,
  public manager:Manager
  ) {
  this.question=this.navParams.get('question');
  this.option=this.navParams.get('option');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoriquePage');
  }

   dismiss(data?:any) {
      this.viewCtrl.dismiss(data);
  } 

  /*Affiche un panneau pour soummetre une question */
   submit(){
     this.manager.Soumit(this.question).then((data)=>{
   //test pblish event
     this.dismiss(this.question);
     });
  }  
}
