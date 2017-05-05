import { Component } from '@angular/core';
import { Events,NavController, NavParams ,ViewController,ModalController } from 'ionic-angular';
import { MatiereDetailsPage } from '../matiere-details/matiere-details';
import { FinalisePage } from '../finalise/finalise';
import { DataService } from '../../providers/data-service';
import { Storage } from '@ionic/storage';
import { Utils} from '../../app/utils';
import { Manager } from '../../providers/manager';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { ConcoursOptionsPage} from '../concours-options/concours-options';
import { LoginPage } from '../login/login';
/*
  Generated class for the Matieres page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-matieres',
  templateUrl: 'matieres.html'
})
export class MatieresPage {

   categorie:any='prepa';
   concours:any;
   _analyses:any[];
   _parties:any[]; 
   authInfo
   analyse:any;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public dataService:DataService,
     public viewCtrl: ViewController,
     public modalCtrl: ModalController,
      public events: Events,
     public af: AngularFire,
     public manager:Manager,
     public storage: Storage) {
     this.concours=this.navParams.get('concours');
     this.observeAuth();
     this.listenToEvents();
  }


observeAuth(){
   this.analyse= Utils.setData(this.concours); 
   this.af.auth.subscribe( user => {
      if (user) 
      { 
        if(user.auth)
          this.authInfo = user.auth;
        else if(user.facebook)
          this.authInfo=user.facebook;
        else if(user.google)
          this.authInfo=user.google;
        Utils.setData(this.concours,{af:this.af,uid:this.authInfo.uid}).then(()=>{
          this.getAnalyse();
        });
       }
    });
}


 ionViewDidLoad() {
    console.log('ionViewDidLoad MatieresPage');
      this.storage.get('_parties').then((data)=>{
          this._parties=data?data:[];
          this.concours.matieres.forEach(matiere => {
            if(matiere.parties||!matiere.parties)
               matiere.parties=this._parties.filter((rep)=>{ return rep.matiere.id==matiere.id; });
              });
           this.analyse=Utils.setData(this.concours); 
        }
     );    
  }
showOptions(){
    this.navCtrl.push(ConcoursOptionsPage,{concours:this.concours});
}

show(matiere:any){
  matiere.concours=this.concours;
  if(matiere.parties.length)  
      this.navCtrl.push(MatiereDetailsPage,{matiere:matiere}); 
 }

inscrire() {
   this.af.auth.subscribe( user => {
      if (user) 
      { 
        if(user.auth)
          this.authInfo = user.auth;
        else if(user.facebook)
          this.authInfo=user.facebook;
        else if(user.google){
          this.authInfo=user.google;
         let modal=this.modalCtrl.create(FinalisePage,{concours:this.concours});
           modal.onDidDismiss((data)=>{
                this.concours.abonnement=data;
           })
           modal.present();
        }
       }else 
       this.navCtrl.push(LoginPage); 
    }); 
    
             
  }


dismiss(data?:any) {
      this.viewCtrl.dismiss(data);
  } 


findRemplace(list:any[],matiere, data:any){
list.forEach(element => {
     if(matiere && element.matiere==matiere.id)
        element=data;  
   });
}

listenToEvents(){
  this.events.subscribe('score:matiere:updated',(data)=>{
    new Promise(()=>{
    this.observeAuth();
    }).then(()=>{
    console.log('score:matiere:updated'); 
    })

  
  });
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

getAnalyse(){
if(this.concours){
  let ref= this.af.database.object('/concours/'+this.concours.id+'/analyse/'+this.authInfo.uid);
       ref.$ref.on('value',(analyse)=>{
         if(analyse.val()){
          this.analyse=analyse.val();
          this.concours.analyse=analyse.val();
          }
         });
    }      
}


}
