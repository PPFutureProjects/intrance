import { Component } from '@angular/core';
import {  ViewChild } from '@angular/core';
import {Events,  Platform ,Nav, MenuController,  } from 'ionic-angular';
import { StatusBar, Splashscreen} from 'ionic-native';
import { ConcoursPage } from '../pages/concours/concours';
import { AboutPage } from '../pages/about/about';
import { SettingPage } from '../pages/setting/setting';
import { MatieresPage } from '../pages/matieres/matieres';
import { HomePage } from '../pages/home/home';
import { HelpPage } from '../pages/help/help';
import { DataService } from '../providers/data-service';
import { ContactPage } from '../pages/contact/contact';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ArticlesPage } from '../pages/articles/articles';
import { LoginPage} from '../pages/login/login';
import { AngularFire} from 'angularfire2';
export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
  rootPage =HomePage;//TabsPage;TutorialPage;// MatieresPage;//
  authInfo: any; 
  appPages: PageInterface[] = [
   //
    { title: 'Accueil', component: HomePage, icon: 'home' },
    { title: 'Concours', component: ConcoursPage, icon: 'school' },
    { title: 'Contacts', component: ContactPage,  icon: 'ios-call' },
    { title: 'A propos', component: AboutPage, icon: 'information-circle' },
    { title: 'Articles', component: ArticlesPage, icon: 'ios-paper' }
 
  ];
  constructor(platform: Platform  , public menu: MenuController,public dataService:DataService,public af: AngularFire,public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
     // this.dataService.clearData();
     // this.loadDataTest();
    this. listenToConnexion(this. events);
    });
   
  }

listenToConnexion(ev:any){
 let connectedRef = this.af.database.object('/status/connected');
  connectedRef.$ref.on('value', function(snap) {  
  ev.publish('connection:state',snap.val()===true);
  
  }); 

connectedRef.$ref.onDisconnect().update(false,(data)=>{
     ev.publish('connection:state',false);
})
}



openSettingPage() {
    // close the menu when clicking a link from the menu
   this.af.auth.subscribe( user => {
      if (user) 
      { 
        if(user.auth)
          this.authInfo = user.auth;
        else if(user.facebook)
          this.authInfo=user.facebook;
        else if(user.google)
          this.authInfo=user.google;
           this.menu.close();
         this.nav.setRoot(SettingPage,{authInfo:this.authInfo});
       }
       else{ this.menu.close();
          this.nav.setRoot(LoginPage);
        }
        
    });
     
  }

    openPage(page: PageInterface) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

loadData(){
    this.dataService.getConcours();
}


loadDataTest(){
 this.dataService.getConcoursTest();
}

}
