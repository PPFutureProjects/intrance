import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire , AuthProviders, AuthMethods} from 'angularfire2';
import firebase from 'firebase';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
 fireAuth: any;

  constructor(public http: Http,public af: AngularFire) {

  }

getAuth(){
    this.af.auth.subscribe
      ( user => {
      if (user) 
      { 
        if(user.auth){
          this.fireAuth = user.auth;
          }
        else if(user.facebook)
          this.fireAuth=user.facebook;
        else if(user.google)
          this.fireAuth=user.google;
       }
       else
       this.fireAuth=null;
    });  
 return this.fireAuth;
}

  loginEmailUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.af.auth.login({
      email: newEmail,
      password: newPassword
    },{
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    });
  }

  registerUserWithFacebook(): firebase.Promise<any> {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

  registerUserWithGoogle(): firebase.Promise<any> {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }


  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return this.af.auth.logout();
  }


  signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.af.auth.createUser({ 
      email: newEmail, 
      password: newPassword 
    }).catch(error=>{
      console.log(JSON.stringify(error));
    });
}
}
