import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Manager provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Manager {
 baseUrl:string='';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(public http: Http,public storage: Storage) {
    console.log('Hello Manager Provider');
  }


 getAnalyse(partie:any) {
   return  this.http.post(this.baseUrl+'/analyse', JSON.stringify(partie),  { headers:this. headers })
              .toPromise()
               .then(response =>{
                 let analyse=response.json();
                 analyse.date=Date.now(); //il est mieux de definir cele sur le serveur
                 this.storage.set(partie.id+'_analyse',analyse); 
                 return response.json();
                 }
            );
  } 


saveResponses(partie:any){
let reponses= partie.reponses.filter(reponse=>{
         return reponse.nonSaved;
  }) ; 
return  this.http.post(this.baseUrl+'/reponses/save', JSON.stringify({reponses:reponses}),  { headers:this. headers })
              .toPromise()
              .then(response =>{
                 let analyse=response.json();
                 analyse.date=Date.now(); //il est mieux de definir cele sur le serveur
                 this.storage.set(partie.id+'_analyse',analyse); 
                 return response.json();
                 }
                 )
               .catch(error=>{
               });
}

saveResponsesTest(partie:any){
  return  this.getAnalyseTest(partie);
  }



 getAnalyseTest(partie:any) {
   return  this.http.get('assets/data/analyse.json',  { headers:this. headers })
              .toPromise()
               .then(response =>{
                 let analyse=response.json();
                 analyse.date=Date.now(); //il est mieux de definir cele sur le serveur
                 this.storage.set(partie.id+'_analyse',analyse); 
                 return response.json();
                 }
        );
  } 

Soumit(question:any) {
   return  this.http.post(this.baseUrl+'/dificult', JSON.stringify(question.reponse),  { headers:this. headers })
              .toPromise()
               .then(response =>response.json())
               .catch(error=>false);
  }  



}
