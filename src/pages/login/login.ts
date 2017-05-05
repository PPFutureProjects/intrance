import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController,ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { EmailValidator } from '../../validators/email';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
 public loginForm: any;
 public loading: any;
  constructor(public nav: NavController, public authService: AuthService, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,  public viewCtrl: ViewController) {
      this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
}); 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



    loginUser(){
      if (!this.loginForm.valid){
        console.log(this.loginForm.value);
      } else {
        this.authService.loginEmailUser(this.loginForm.value.email, this.loginForm.value.password)
        .then( authData => {
         this.loading.dismiss().then( () => {
             this.nav.pop();
          });
        }, error => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
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
        //  dismissOnPageChange: true,
        });
        this.loading.present();
      }
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }

  createAccount(){
    this.nav.push(SignupPage);
}

  registerUserWithFacebook() {
    this.authService.registerUserWithFacebook()
    .then((authData)=>{}, error => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
        });
  }

  registerUserWithGoogle() {
   this.authService.registerUserWithGoogle()
    .then((authData)=>{}, error => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
        });
  }
}
