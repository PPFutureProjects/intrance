import { Component } from '@angular/core';
import { Events, NavController, NavParams ,ViewController,ModalController } from 'ionic-angular';
import { StartPage} from '../start/start';
import { FinalisePage } from '../finalise/finalise';
import { ScorePage } from '../score/score';
import { Storage } from '@ionic/storage';
import { AnalysePage } from '../analyse/analyse';
import { Utils} from '../../app/utils';
import { AngularFire, AngularFireAuth } from 'angularfire2';
/*
  Generated class for the MatiereDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-matiere-details',
  templateUrl: 'matiere-details.html'
})

export class MatiereDetailsPage {
 matiere:any;
 _parties:any[];
 _questions:any[];
 analyse:any;
authInfo:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public af: AngularFire,
    public storage: Storage,
    public events: Events,
    public viewCtrl: ViewController) {
    this.matiere=this.navParams.get('matiere');
    this.listenToEvents();
  }


dismiss(data?:any) {
      this.viewCtrl.dismiss(data);
  } 

listenToEvents(){
  this.events.subscribe('score:partie:updated',(data)=>{
          this.setParties().then(()=>{
      this.observeAuth();
      this.events.publish('score:matiere:updated');
   })
        
  });
}


/** Compare le score et le temps de reponse */
  ionViewDidLoad() {
   this.setParties().then(()=>{
      this.observeAuth();
   })  
  }


public setParties(){
  return this.storage.get('_parties')
     .then((data)=>{
         this._parties=data?data:[];
         this.matiere.parties=this._parties.filter((rep)=>{
          return rep.matiere.id==this.matiere.id; }); 
          if(!this.matiere.parties||!this.matiere.parties.length)
            this.af.database.list('/parties/sources/'+this.matiere.id).$ref.once('value',(parties)=>{
               if(parties.val()){
                 this.matiere.parties=parties.val();  
                   this._parties.push(parties.val()) ;
                  this.storage.set('_parties',  this._parties)
             }
         });
         
  });
}


  observeAuth(){
   this.analyse= Utils.setNotes(this.matiere);
    this.matiere.analyse=Utils.setNotes(this.matiere);
   this.af.auth.subscribe( user => {
      if (user) 
      { 
        if(user.auth)
          this.authInfo = user.auth;
        else if(user.facebook)
          this.authInfo=user.facebook;
        else if(user.google)
          this.authInfo=user.google;
          Utils.setNotes(this.matiere,{af:this.af,uid:this.authInfo.uid}).then(()=>{
               this.getAnalyse();
          }); 
       }    
    });
}

getAnalyse(){
if(this.matiere){
     let ref=this.af.database.object('/matieres/'+this.matiere.id+'/analyse/'+this.authInfo.uid);
       ref.$ref.on('value',(analyse)=>{
        if(analyse.val())
         this.analyse=analyse.val(); 
         this.matiere=  analyse.val();    
         });
    }      
}


/** Compare le score et le temps de reponse */
show(partie:any){
  if(partie.questions.length)
    this.navCtrl.push(ScorePage,{partie:partie,matiere:this.matiere})
   // console.log(JSON.stringify(partie));
}

inscrire(){
this.navCtrl.push(FinalisePage,{entity:{}})  ;
}

/** Compare le score et le temps de reponse */
showAnalyse(){
 let modal= this.modalCtrl.create(AnalysePage, {matiere:this.matiere})  ;
  modal.present();
}

getClass(obj:any):string{
  if(!obj.objectif)
   return 'none';
   else if(obj.objectif<20)
  return 'danger';
  else if(obj.objectif<50)
    return 'warning';
  else
     return 'success';
}

}
