import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { AuthService} from './auth-service';
import { Http,Headers } from '@angular/http';

@Injectable()
export class Read {
     baseUrl:any;
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor( public http: Http) {
  }




 getArticles(local='fr') {
    return this.http.get(this.baseUrl+'/'+local+'/articles', {headers: this.headers})
    .toPromise()
     .then(res =>res.json())
     .catch(error => {
         console.log(error.status);
     });           
    }



 getArticlesTest(local='fr') {
    return this.http.get('assets/data/read/articles.json', {headers: this.headers})
    .toPromise()
     .then(res =>res.json())
     .catch(error => {
         console.log(error.status);
     });           
    }

 getAbaout(local='fr') {
    return this.http.get('assets/data/read/fr_abaout.json', {headers: this.headers})
    .toPromise()
     .then(res =>res.json())
     .catch(error => {
         console.log(error.status);
     });           
    }

 getContacts(local='fr') {
    return this.http.get('assets/data/read/contacts.json', {headers: this.headers})
    .toPromise()
     .then(res =>res.json())
     .catch(error => {
         console.log(error.status);
     });           
    }

}
