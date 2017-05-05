import { Component } from '@angular/core';
import {Events,   NavController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFire, AngularFireAuth } from 'angularfire2';
/*
  Generated class for the Concours page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-concours',
  templateUrl: 'concours.html'
})
export class ConcoursPage {
  _concours:any[];
  queryText = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage ,
     public af: AngularFire,
    public events: Events,
    ) {
     this.listenToEvents();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConcoursPage');
     let searchText=this.navParams.get('searchText');
      this.loadData(searchText).then(()=>{
           console.log("load"); 
      }).catch((error)=>{
         console.log("error"); 
  })

}

  listenToEvents() {
     this.events.subscribe('concours:load:success', (data) => {
       this. _concours=data;
    });
        this.events.subscribe('concours:load:error', (error) => {
         //listen load error
    }); 
}


loadData(searchText?:any){

  if(this.isConnected())
    return   this.af.database.list('/concours/sources').$ref.once('value',(concours)=>{
          if(concours.val()){
           this._concours=concours.val();
            if(searchText)
                 this.search();       
               return this.storage.set('_concours', this._concours)
          } });
      
    return this.storage.get('_concours').then((data)=>{
               this. _concours=data?data:[]; 
                 if(searchText)
                    this.search(); 
                     
            });
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

search(text?:any) {
  let queryText =(text)? text.toLowerCase().replace(/,|\.|-/g, ' '):this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
  let queryWords = queryText.split(' ').filter(w => !!w.trim().length);
   this._concours.forEach(item => {
   item.hide = true;
   this.filter(item, queryWords);
   });

  }


filter(item, queryWords){
let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach(queryWord => {
        if (item.nom.toLowerCase().indexOf(queryWord) > -1||item.ecole.toLowerCase().indexOf(queryWord) > -1 ||item.abreviation.toLowerCase().indexOf(queryWord) > -1 ) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }
     item.hide = !(matchesQueryText );
}


}
