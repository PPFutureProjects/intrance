import { NgModule, ErrorHandler,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HelpPage } from '../pages/help/help';
import { ArticlesPage } from '../pages/articles/articles';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { Manager } from '../providers/manager';
import { Read } from '../providers/read';
import { ConcoursPage } from '../pages/concours/concours';
import { SettingPage } from '../pages/setting/setting';
import { StartPage } from '../pages/start/start';
import { ScorePage } from '../pages/score/score';
import { HistoriquePage } from '../pages/historique/historique';
import { MatieresPage } from '../pages/matieres/matieres';
import { MatiereDetailsPage } from '../pages/matiere-details/matiere-details';
import { FinalisePage } from '../pages/finalise/finalise';
import { ConcoursOptionsPage } from '../pages/concours-options/concours-options';
import { TabsPage } from '../pages/tabs/tabs';
import { MathJaxDirective } from '../directives/Mathjax.directive';
import { DataService} from '../providers/data-service';
import { ConcoursListComponent } from '../components/concours-list/concours-list';
import { FlashCardComponent } from '../components/flash-card/flash-card';
import { PopupComponent } from '../components/popup/popup';
import { MenuFlatComponent } from '../components/menu-flat/menu-flat';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ArticleDetailsPage} from '../pages/article-details/article-details';
import { DashboordItemComponent } from '../components/dashboord-item/dashboord-item';
import { Storage } from '@ionic/storage';
import { AuthService } from '../providers/auth-service';
import { AngularFireModule} from 'angularfire2';


  const firebaseConfig = {
    apiKey: "AIzaSyBrbc1Rps9F_s8bJ3ZrWxkYsk5ygoHnp3c",
    authDomain: "trainings-fa73e.firebaseapp.com",
    databaseURL: "https://trainings-fa73e.firebaseio.com",
    projectId: "trainings-fa73e",
    storageBucket: "trainings-fa73e.appspot.com",
    messagingSenderId: "163815809818"
  };

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ConcoursPage,
    StartPage,
    ScorePage,
    HistoriquePage,
    MatieresPage,
    ConcoursOptionsPage,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    SettingPage,
    TabsPage,
    FinalisePage,
    MatiereDetailsPage,
    TutorialPage,
    ArticleDetailsPage,
    MathJaxDirective,
    DashboordItemComponent,
    ConcoursListComponent,
    MenuFlatComponent,
    HelpPage,
    ArticlesPage,
    FlashCardComponent,
    PopupComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp), AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ConcoursPage,
    StartPage,
    ScorePage,
    HistoriquePage,
    MatieresPage,
    SettingPage,
    ConcoursOptionsPage,  
    MatiereDetailsPage,  
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    FinalisePage,
    TutorialPage,
    ArticleDetailsPage,
    TabsPage,
    DashboordItemComponent,
    ConcoursListComponent,
    MenuFlatComponent,
    HelpPage,
    ArticlesPage,
    FlashCardComponent,
    PopupComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},DataService,Manager, Storage,Read,AuthService],
 schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
