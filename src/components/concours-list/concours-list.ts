import { Component , Input} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConcoursOptionsPage} from '../../pages/concours-options/concours-options';
import { MatieresPage } from '../../pages/matieres/matieres';

/*
  Generated class for the ConcoursList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'concours-list',
  templateUrl: 'concours-list.html'
})
export class ConcoursListComponent {
    @Input()
  concoursList:any[];
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello ConcoursList Component');

  }
showContenu(concours:any){
  if(concours.matieres.length)
      this.navCtrl.push(MatieresPage,{concours:concours});
}

showOptions(concours:any){
    this.navCtrl.push(ConcoursOptionsPage,{concours:concours});
}


openSearch(){
  
}


}
