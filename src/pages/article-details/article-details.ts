import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ArticleDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-article-details',
  templateUrl: 'article-details.html'
})
export class ArticleDetailsPage {
 article:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.article=this.navParams.get('article');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleDetailsPage');
  }

}
