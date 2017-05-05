import { Component, ViewChild } from '@angular/core';
import { Events,NavController, NavParams ,FabContainer,ModalController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HistoriquePage } from '../historique/historique';
import { AnalysePage } from '../analyse/analyse';
import { StartPage} from '../start/start';
import { Utils} from '../../app/utils';
import { AngularFire, AngularFireAuth } from 'angularfire2';
/*
  Generated class for the Score page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-score',
  templateUrl: 'score.html'
})
export class ScorePage {
 @ViewChild('slides') slides: any; 
// @ViewChild('fab') fab: any; 
 partie:any={};
 _questions:any[];
 _parties:any[];
 hasAnswered: boolean = false;
  currentQuestion:any={};
  slideOptions: any;
  maxTime:number=5000;
  time=this.maxTime;
  isTheEnd:boolean=true;
  isTheBegining:boolean=true;
  modal:any;
  isAmswering:boolean=true;
  timer =0;
  isMathProcessed=false;
  start:number;
  authInfo: any;
  matiere;
  analyse:any;
  option:any; 
  constructor(
  public navCtrl: NavController,
  public navParams: NavParams, 
  public modalCtrl: ModalController, 
  public events: Events,
  public af: AngularFire,
  public viewCtrl: ViewController, 
  public storage: Storage) {
  this.slideOptions = { onlyExternal: true}; 
  this.partie=this.navParams.get('partie');
   this.matiere=this.navParams.get('matiere');
  this.analyse= this.partie.analyse;
  this.observeAuth();
    }

  ionViewDidLoad() {
    this.storage.get('_parties').then((data)=>{
          this._parties=data?data:[];
          this.partie=this._parties.find((rep)=>{return rep.id==this.partie.id;});
          this.isTheBegining=this.partie.lastIndex?false:true;         
           setTimeout(() => { this.isMathProcessed=true; },4000);
          if(!this.partie.questions||!this.partie.questions.length)
               this.setQuestions(); 
         });
      }

setQuestions(){
   
     return  this.storage.get('_questions').then((data) =>{  
               this._questions= data?data:[];
               this.partie.questions=this._questions.filter((rep)=>{ return rep.partie.id==this.partie.id; });
               if(!this.partie.questions||!this.partie.questions.length)
                 this.af.database.list('/questions/sources/'+this.partie.id).$ref.once('value',(questions)=>{
                    if(questions.val()){
                      this.partie.questions=questions.val();
                      this.storage.set('_parties',this._parties);   
                   }
                 });
       }) ;
}

dismiss(data?:any) {
      this.viewCtrl.dismiss(data);
  } 

observeAuth(){
   this.analyse= Utils.setScore(this.partie); 
   this.partie.analyse=Utils.setScore(this.partie);
    this.af.auth.subscribe( user => {
      if (user) 
      { 
        if(user.auth)
          this.authInfo = user.auth;
        else if(user.facebook)
          this.authInfo=user.facebook;
        else if(user.google)
          this.authInfo=user.google;
          Utils.setScore(this.partie,{af:this.af,uid:this.authInfo.uid}).then(()=>{
            this.getAnalyse();
         }); 
       }
     });
  

}


/*Question suivante */
  next(){
    this.option=null;;
     this.isTheEnd=this.isEnd();
    if(this.isTheEnd){  
          clearInterval(this.timer);     
           this.setScore();       
         }else{
     this.didGoToNext();  
     this.slides.slideNext();
     let activeIndex=this.slides.getActiveIndex();
     this.partie.lastIndex=activeIndex;
     this.start=activeIndex;
     this.currentQuestion=this.partie.questions[activeIndex];
     this.isTheBegining=this.isBeginning();
    if(this.currentQuestion&&this.isAmswering)
           this.counter();             
         }
    this.storage.set('_parties',this._parties);                
  }


/* */ 
isEnd(){
     return (this.start==this.partie.questions.length-1); 
}



/**/ 
isBeginning(){
      return this.start==0; 
}


/*Compteur de temps*/
counter(){
      this.maxTime=this.currentQuestion.time; 
      this.time=this.currentQuestion.restOfTime==undefined||this.currentQuestion.restarting?this.currentQuestion.time:this.currentQuestion.restOfTime;
      this.currentQuestion.restarting=false;
      setTimeout(() => {
      if(!this.timer)
      this.timer = setInterval(() => {
        if(this.time != 0) {
          this.time -= 1000;
        } else {
          this.next();
        }
      }, 1000)},1000);

}

/*Question precedente*/
  preview(){
     this.option=null;;
    if(this.isAmswering)
     this.slides.slidePrev();
     this.isTheEnd=this.isEnd();
     this.isTheBegining=this.isBeginning();
     let activeIndex=this.slides.getActiveIndex();
     this.currentQuestion=this.partie.questions[activeIndex];
     this.partie.lastIndex=activeIndex;
     this.start=activeIndex;
    if(this.currentQuestion&&this.isAmswering)
        this.counter();
  }


/*Recommencer a la premiere question*/
  restart(){
 this.start=this.partie.lastIndex&&this.partie.lastIndex<this.partie.questions.length-1?this.partie.lastIndex:0;
    if(!this.partie.questions.length)
      return; 
     if(this.partie.note){
          this.reset(); 
     // this.partie.restarting=true;              
   }
    setTimeout(() => 
   {
        this.slides.slideTo(this.start);
           this.isTheEnd=false;
           this.timer=undefined;
           this.isAmswering=true;
           this.slides.update();
           this.isTheBegining=this.isBeginning(); 
   },500); 
     this.currentQuestion=this.partie.questions[this.start];
       if(this.currentQuestion) 
         this.counter();      
  }



/*Quelles toute les réponses */
reset(){
  this.partie.questions.forEach(element => {
          element.restarting=true;
         // element.restOfTime=undefined;
  });
  
}


/*Parcours pour voir le corrigé*/
  startVisit(){
    this.start=0;
   if(!this.partie.questions.length)
      return; 
        setTimeout(() => 
         {
       this.slides.slideTo(0);
       this.isTheEnd=false;
       this.slides.update();
   },500);  
      this.isAmswering=false; 
       this.isTheBegining=this.slides.isBeginning();
       this.currentQuestion=this.partie.questions[0];   
  }


/*Parcours */
 didGoToNext(){
    this.option=null;;
    if(this.currentQuestion){
    if(this.isAmswering)
      this.currentQuestion.restOfTime=this.time;
    if(!this.currentQuestion.firstAmswer)
         this.currentQuestion.firstAmswer=this.currentQuestion.amswer;
         }
     if(this.modal)
        this.modal.dismiss();        
 }


/*Parcours fin du test et retour a la liste */
  end(){
    this.didGoToNext();
    this.slides.slideTo(this.partie.questions.length, 100);
    this.isTheEnd=true;
     clearInterval(this.timer);      
    this.setScore();
    this.storage.set('_parties',this._parties); 
  } 


/** Compare le score et le temps de reponse */
showAnalyse(){
 let modal= this.modalCtrl.create(AnalysePage, {partie:this.partie})  ;
  modal.onDidDismiss(data => {
    if(data=='info')
      this.navCtrl.push(StartPage,{partie:this.partie})
   });
  modal.present();
}



showInfo(){
   this.navCtrl.push(StartPage,{partie:this.partie});
}



/*Parcour pour voir le corrigé*/
hasAmswer(question:any):boolean{
       return Utils.hasAmswer(question); //(this.isAmswering &&  question.amswer &&question.restOfTime<=0 )?true:question.restOfTime<=0;
}


/*Vrai si la reponse est celle de choisie */
isThis(question:any,amswer:any):boolean{
  return Utils.isThis(question,amswer);
}



/*Vrai si la reponse choisie est la bonne */
isCorrect(question:any,amswer?:any):boolean{
      return Utils.isCorrect(question,amswer);
}


/*Vrai si la reponse choisie est la bonne */
isFirstCorrect(question:any):boolean{
      return Utils.isFirstCorrect(question);
}

/*Affiche le paneau */
  show(action:string){
    this.option=action;
    if(action=='hint' && !this.isAmswering)
    this.option='explication';
  }

questionNumber(){
  let activeIndex=this.start+1;
  return (this.partie&& this.partie.questions) ?activeIndex+'/'+this.partie.questions.length:'...';
}


/** Calcul du nombre de points*/
setScore(){ 
   this.observeAuth(); 
   this.events.publish('score:partie:updated'); 
 
}


format(s,hrSep='h ',minSep='min'):string{
   return Utils.format(s,hrSep,minSep);
}

getAnalyse(){
    if(this.partie){
      let ref= this.af.database.object('/parties/'+this.partie.id+'/analyse/'+this.authInfo.uid);
        ref.$ref.on('value',(analyse)=>{
          if(analyse.val())
           this.analyse=analyse.val();
          this.partie.analyse=analyse.val();
         });
    }      
}


}
