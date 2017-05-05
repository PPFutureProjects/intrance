import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController,ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm;
  loading;

  constructor(public nav: NavController, public authData: AuthService,  public authService: AuthService,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController,  public viewCtrl: ViewController) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

dismiss(){
  this.viewCtrl.dismiss();
}
  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {
         this.loading.dismiss().then( () => {
           //this.nav.pop();
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
  }

    registerUserWithFacebook() {
    this.authService.registerUserWithFacebook()
    .then((authData)=>{}, error => {
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
  }

  registerUserWithGoogle() {
   this.authService.registerUserWithGoogle()
    .then((authData)=>{}, error => {
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
  }
}