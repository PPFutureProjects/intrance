import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { Manager } from '../../providers/manager';
import { Storage } from '@ionic/storage';
import { StartPage} from '../start/start';
import { Utils} from '../../app/utils';
/*
  Generated class for the Analyse page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-analyse',
  templateUrl: 'analyse.html'
})
export class AnalysePage {
partie:any;
matiere:any;
_analyses:any[];
uptodate:boolean;
stape='analyse';
constructor(
 public navCtrl: NavController,
 public navParams: NavParams,
 public manager:Manager,
 public viewCtrl: ViewController,
 public storage: Storage) {}
  ionViewDidLoad() {
    this.partie=this.navParams.get('partie');
    this.matiere=this.navParams.get('matiere');
    if(this.partie && Utils.canHasScore(this.partie))
        Utils.setScore(this.partie);
    if(this.matiere)
       Utils.setNotes(this.matiere);
    this.getLocal();    
    console.log('ionViewDidLoad AnalysePage');       
  }

findRemplace(list:any[],data:any){
list.forEach(element => {
     if((this.partie && element.partie==this.partie.id)||(this.matiere && element.matiere==this.matiere.id))
        element=data;  
   });
}

/** Compare le score et le temps de reponse */
getAnalyse(){
 return  this.manager.getAnalyseTest({partie:this.partie,matiere:this.matiere})
  .then((response)=>{
        let analyse=response;
           analyse.date=Date.now(); 
           if(this.partie)
                   this.partie.analyse=analyse;
          else if(this.matiere)
               this.matiere.analyse=analyse;
          this.findRemplace( this. _analyses,analyse); 
           this.storage.set('_analyses',this._analyses); 
  }).catch(error=>{ });
}


getLocal(){
 return this.storage.get('_analyses').then((data)=>{
             this._analyses=data?data:[];  
             if(this.partie)
                   this.partie.analyse=this._analyses.find((analyse)=>{ return analyse.partie==this.partie.id; });
              else if(this.matiere)
                      this.matiere.analyse=this._analyses.find((analyse)=>{ return analyse.matiere==this.matiere.id; });            
         });
}


dismiss(data?:any) {
      this.viewCtrl.dismiss(data);
  } 

format(s:any){
 return Utils.format(s);
}
 
}
