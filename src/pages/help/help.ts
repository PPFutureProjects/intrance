import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Read} from '../../providers/read';
/*
  Generated class for the Help page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {
 articles:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public read:Read) {
 this.read.getArticlesTest()
       .then(res=>{
           this.articles=res;
       }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

showArticle(article:any){

}

}
