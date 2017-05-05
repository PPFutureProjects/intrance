import { Component ,ViewChild,Input} from '@angular/core';
import { Nav,MenuController,  NavController, NavParams  } from 'ionic-angular';
import { ConcoursPage } from '../../pages/concours/concours';
import { AboutPage } from '../../pages/about/about';
import { SettingPage} from '../../pages/setting/setting';
import { MatieresPage } from '../../pages/matieres/matieres';
import { HelpPage } from '../../pages/help/help';
/*
  Generated class for the MenuFlat component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}
@Component({
  selector: 'menu-flat',
  templateUrl: 'menu-flat.html'
})
export class MenuFlatComponent {

  @Input()
  nav: Nav;
  appPages: PageInterface[] = [
  //  { title: 'Accueil', component: HomePage, icon: 'home' },
    { title: 'Concours', component: ConcoursPage, icon: 'school' },
    { title: 'Options', component: SettingPage,  icon: 'options' },
    { title: 'Contacts', component: AboutPage,  icon: 'ios-call' },
    { title: 'A propos', component: AboutPage, icon: 'information-circle' },
    { title: 'Articles', component: HelpPage, icon: 'ios-paper' },
 
  ];
  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams) {
    console.log('Hello MenuFlat Component');
  }

    openPage(page: PageInterface) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if(this.nav)
       this.nav.setRoot(page.component);
       else
       this.navCtrl.setRoot(page.component);
  }
}
