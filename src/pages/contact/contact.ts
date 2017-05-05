import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Read} from '../../providers/read';
/*
  Generated class for the Contact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
 contacts={};
 constructor(public navCtrl: NavController,public read:Read) {
    this.read.getContacts()
       .then(res=>{
           this.contacts=res;
       }); 
  }


  ionViewDidLoad() {
    console.log('Hello ContactPage Page');
  }



}
