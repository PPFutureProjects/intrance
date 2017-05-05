import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Read} from '../../providers/read';
import { ArticleDetailsPage } from '../article-details/article-details';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Articles page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html'
})
export class ArticlesPage {
_articles:any[]=[];
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    public storage: Storage ,
     public af: AngularFire,     
      public read:Read
      ) {
   
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlesPage');
  if(this.isConnected())
      this.af.database.list('/articles/fr/sources').$ref.once('value',(articles)=>{
          if(articles.val()){
           this._articles=articles.val();     
               this.storage.set('_articles', this._articles)
          } });
     else 
     this.storage.get('_articles').then((data)=>{
               this. _articles=data?data:[];   
            });    
}


showArticle(article){
 this.navCtrl.push(ArticleDetailsPage,{article:article});
}

isConnected():boolean{
 let connectedRef = this.af.database.object('.info/connected');
  connectedRef.$ref.on('value', function(snap) {
  if (snap.val() === true) {    
     return true;
   }
  }); 
  return false;
}
}
