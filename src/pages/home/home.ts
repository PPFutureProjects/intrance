import { Component } from '@angular/core';
import {Events,  NavController, NavParams } from 'ionic-angular';
import { ConcoursOptionsPage} from '../concours-options/concours-options';
import { ConcoursPage } from '../concours/concours';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { SettingPage } from '../setting/setting';
import { MatieresPage } from '../matieres/matieres';
import { ArticlesPage } from '../articles/articles';
import { Storage } from '@ionic/storage';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { Utils} from '../../app/utils';
import { AuthService } from '../../providers/auth-service';
/*
  Generated class for the Concours page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  concours:any;
  authInfo: any; 
  queryText = '';   _parties:any[]; 
  preference:any={};
  analyse:any;
appPages: PageInterface[] = [
    { title: 'Concours', component: ConcoursPage, icon: 'ios-school' },
    { title: 'Contacts', component: ContactPage,  icon: 'ios-call' },
    { title: 'A propos', component: AboutPage, icon: 'information-circle' },
    { title: 'Articles', component: ArticlesPage, icon: 'ios-paper' },
  ];
  constructor(
    public navCtrl: NavController,public af: AngularFire, public events: Events,
    public navParams: NavParams, public authData: AuthService,
    public storage: Storage) {
    this.listenToEvents();
    }



  ionViewDidLoad() {
     this.storage.get('_preferences')
     .then((data)=>{
       this.preference=data?data:{};
       this.storage.get('_concours')
      .then((data)=>{
       let _concous:any[]=data?data:[];
       this.concours=_concous.find(concous=>{
        return  concous.id==this.preference.defaultProgramm;
      }); 
         this.setDefaultData();
          this.observeAuth();
     }); 
    });       
  }


setDefaultData(){
         if(this.concours)
         this.storage.get('_parties').then((data)=>{
          this._parties=data?data:[];
          this.concours.matieres.forEach(matiere => {
           if(matiere.parties||!matiere.parties)
               matiere.parties=this._parties.filter((rep)=>{ return rep.matiere.id==matiere.id; });
              });            
        });             
}


getAnalyse(){
if(this.concours){
  let ref= this.af.database.object('/concours/'+this.concours.id+'/analyse/'+this.authInfo.uid);
       ref.$ref.on('value',(analyse)=>{
         if(analyse.val())
          this.analyse=analyse.val();
         });
    }      
}

listenToEvents(){
  this.events.subscribe('default_programm:changed',(data)=>{
  this.concours=data;
     this.setDefaultData();
      this.observeAuth();
  });
 this.events.subscribe('score:matiere:updated',(data)=>{
   this.observeAuth();
  });
}


openSettingPage() {

   this.af.auth.subscribe( user => {
      if (user) 
      { 
        if(user.auth)
          this.authInfo = user.auth;
        else if(user.facebook)
          this.authInfo=user.facebook;
        else if(user.google)
          this.authInfo=user.google;
         this.navCtrl.setRoot(SettingPage,{authInfo:this.authInfo});
       }else 
       this.navCtrl.setRoot(LoginPage); 
    }); 
    
             
  }


observeAuth(){
  if(this.concours)
  this.analyse= Utils.setData(this.concours); 
   console.log(' Utils.setData(this.concours)\n ' +JSON.stringify(this.analyse));
   this.af.auth.subscribe( user => {
      if (user) 
      { 
        if(user.auth)
          this.authInfo = user.auth;
        else if(user.facebook)
          this.authInfo=user.facebook;
        else if(user.google)
          this.authInfo=user.google;
          if(this.concours)
        Utils.setData(this.concours,{af:this.af,uid:this.authInfo.uid}).then(()=>{
         this.getAnalyse();
        });
       }else 
       this.authInfo=null; 
    });
}

openPage(page: PageInterface) {
    // close the menu when clicking a link from the menu
       this.navCtrl.push(page.component);
  }

  openSearch(){
    if(this.queryText)
      this.navCtrl.push(ConcoursPage,{searchText:this.queryText})
  }

  openProgramme(){
      this.navCtrl.push(ConcoursPage)
  }  

 showDetails(){
   this.navCtrl.push(MatieresPage,{concours:this.concours});
} 

showOptions(){
    this.navCtrl.push(ConcoursOptionsPage,{concours:this.concours});
}
toFixed(value:any,dec:number=1):any{
    let formated=Number(value).toFixed(dec);
    return formated;
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