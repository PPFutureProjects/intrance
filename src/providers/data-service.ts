import { Injectable } from '@angular/core';
import {  Http ,  Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
@Injectable()
export class DataService {
data: any;
 private headers = new Headers({'Content-Type': 'application/json'});
 baseUrl:string='';
  constructor(public http: Http,public storage: Storage, public events: Events) {
    console.log('Hello DataService Provider');
 
  }


getQuestion() {
    return this.http.get('assets/data/question.json')
              .toPromise()
               .then(response =>response.json())
               .catch(error=>{
               });
  }

load(){
        if(this.data){
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            this.http.get('assets/data/questions.json').map(res => res.json()).subscribe(data => {
                this.data = data.questions;
                resolve(this.data);
            });

        });

    }

 /*Recherche la date de derniere mise a jour*/

 getLastModifiedTime(type:string){
 	   let _last_modified_time = window.localStorage.getItem(type+'_last_modified_time');
	return _last_modified_time;    
 } 

 /*Recherche la date de derniere mise a jour*/
getConcours(){
  let last_modified_time=this.getLastModifiedTime('concours');
  let  _concours:any[];
    this.storage.get('_concours')
    .then((data)=>{ _concours=data?data:[];  
     return  this.http.get(this.baseUrl+'/concours/'+last_modified_time,  { headers:this. headers })
              .toPromise()
               .then(response =>{
                 let concours=response.json();
                 window.localStorage.setItem('concours_last_modified_time',''+Date.now());
                 _concours.push.apply(_concours,concours);                 
                 return  this.storage.set('_concours', _concours).then(()=>{
                    this.events.publish('concours:load:success',_concours);
                    this.manageMatieres(concours);
               });
                 }
            );    
    });
}

/**build matieres list */
manageMatieres(concours:any[]){
let _matieres :any[];
this.storage.get('_matieres')
    .then((data)=>{
       _matieres=data?data:[];
        let matieres:any=[];
         concours.forEach(concours => {
         _matieres.push.apply(_matieres,concours.matieres);  
           matieres.push.apply(matieres,concours.matieres);   
          });
          this.storage.set('_matieres', _matieres).then(()=>{   
            this.manageParties(matieres);
           });  
      })
  ;

}
clearData(){
  this.storage.clear();
}
manageParties(matieres:any[]){
let _parties :any[];
this.storage.get('_parties')
    .then((data)=>{
       _parties=data?data:[];
         matieres.forEach(matiere => {
         _parties.push.apply(_parties,matiere.parties);  
          });
        this.storage.set('_parties', _parties);
      })
  ;
}
 /*Recherche la date de derniere mise a jour*/
getConcoursTest(){
  let  _concours:any[];
     return  this.http.get('assets/data/concours.json',  { headers:this. headers })
              .toPromise()
               .then(response =>{
                 let _concours=response.json();
                 window.localStorage.setItem('concours_last_modified_time',''+Date.now()); 
                return  this.storage.set('_concours', _concours).then(()=>{
                    this.events.publish('concours:load:success',_concours);
                     this.manageMatieres(_concours);
               });
                 }
            );    

}

/*Recherche les questions*/
getQuestions(concours:any){   
  let  _questions:any[];
    this.storage.get('_questions')
    .then((data)=>{ _questions=data?data:[];
      concours.matieres.forEach(matiere => {                 
        this.http.get(this.baseUrl+'/questions/'+matiere.id , { headers:this. headers })
              .toPromise()
               .then(response =>{
                 let questions=response.json();
                 _questions.push.apply(_questions,questions);                 
          }
        );  
       });
  }).then(()=>{
        return this.storage.set('_questions', _questions).then(()=>{
              this.getReponses(concours);
        });
    });
}

/*Recherche les questions*/
getReponses(concours:any){   
  let  _reponses:any[]=[];
     this.storage.get('_reponses')
    .then((data)=>{ _reponses=data?data:[];
      concours.matieres.forEach(matiere => {                 
        this.http.get(this.baseUrl+'/reponses/'+matiere.id , { headers:this. headers })
              .toPromise()
               .then(response =>{
                 let questions=response.json();
                 _reponses.push.apply(_reponses,questions);                 
          }
        );  
       });
  }).then(()=>{
        return this.storage.set('_reponses', _reponses);
    });
}

/*Recherche les questions*/
getQuestionsTest(concours:any){   
  let  _questions:any[];
  this.http.get('assets/data/questions.json' , { headers:this. headers })
              .toPromise()
               .then(response =>{
                 _questions=response.json(); 
          }
        ).then(()=>{
        return this.storage.set('_questions', _questions).then(()=>{
              this.getReponsesTest(concours);
        });
    })  
}

/*Recherche les questions*/
getReponsesTest(concours:any){   
  let  _reponses:any[];
  this.http.get('assets/data/reponses.json' , { headers:this. headers })
              .toPromise()
               .then(response =>{
                 _reponses=response.json(); 
          }
        ).then(()=>{
        return this.storage.set('_reponses', _reponses);
    })  
}
}
