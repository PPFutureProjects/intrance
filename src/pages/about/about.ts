import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Read} from '../../providers/read';
/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage  implements OnInit{
 abaout:any={};
  constructor(public navCtrl: NavController,public read:Read) {
    this.read.getAbaout()
       .then(res=>{
           this.abaout=res;
           console.log(this.abaout.imageUrl);
       }); 
  }

ngOnInit(){
     	
}
 ngAfterViewInit() {
    console.log('Hello LocalisationPage Page');

  }
}
