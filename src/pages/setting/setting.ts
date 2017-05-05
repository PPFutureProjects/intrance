import { Inject, Component} from "@angular/core";
import {Events,   NavController, LoadingController, AlertController,ViewController , NavParams } from 'ionic-angular';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
    authInfo: any; 
    loading;
     preference:any={};
     paidConcours:any[];
    
     prefRef:any;
     constructor(
     public af: AngularFire, 
      public authData: AuthService,
      public storage: Storage , 
      public events: Events,
      public loadingCtrl: LoadingController,
      public nav: NavController,
       public navParams: NavParams,
      public alertCtrl: AlertController,
      public viewCtrl: ViewController) {
      this.authInfo=this.navParams.get('authInfo');

      this. loadPaidConcours();
  }

  

loadPaidConcours(){

this.prefRef=this.af.database.object('/preferences/'+this.authInfo.uid).$ref;
  this.prefRef.once('value',(pref)=>{
        if(pref.val())
          this.preference=pref.val();
         });
      
}


  logout() {
    this.authData.logoutUser()
      .then(() => {
      
          this.loading.dismiss().then( () => {
            this.nav.pop();
          });
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });
   this.loading = this.loadingCtrl.create({
       // dismissOnPageChange: true,
      });
      this.loading.present();    
  }

toggleTime(){
 this.preference.isTimed=this.preference.isTimed?false:true;
 this.prefRef.update(this.preference).then(()=>{
    this.storage.set('_preferences',this.preference)
 });
}

toggleHint(){
  this.preference.isHinted=this.preference.isHinted?false:true;
 this.prefRef.update(this.preference).then(()=>{
    this.storage.set('_preferences',this.preference)
 });
}
setDefault(paid:any){
 this.preference.defaultProgramm=paid.id;
  this.prefRef.update(this.preference).then(()=>{
    this.storage.set('_preferences',this.preference).then(()=>{
       this.events.publish('default_programm:changed',paid);
          console.log('default_programm:changed');    
    })
  }) ;

}

}
