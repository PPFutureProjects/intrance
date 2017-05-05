import { Component, Input } from '@angular/core';
import { Utils} from '../../app/utils';
import { Storage } from '@ionic/storage';
import { Manager } from '../../providers/manager';
import { AngularFire, AngularFireAuth } from 'angularfire2';
/*
  Generated class for the DashboordItem component.
  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'dashboord-item',
  templateUrl: 'dashboord-item.html'
})
export class DashboordItemComponent {
    @Input()
    partie: any;
     @Input()
    matiere: any;
     @Input()
   concours: any;
     @Input()
   isShow:any=false;
     @Input()
   showToggle=true;
     @Input()
   dashBoardClass='dasboard  ep';
   _analyses:any[];
    @Input()
    analyse:any;
    ref:any;
    @Input()
    authInfo:any;
    
   constructor( public storage: Storage,public manager:Manager,public af: AngularFire) {
     this.af.database.object(''.).$ref.
      }

isConnected():boolean{
 let connectedRef = this.af.database.object('.info/connected');
  connectedRef.$ref.on('value', function(snap) {
  if (snap.val() === true) {    
     return true;
   }
  }); 
  return false;
}

/**/ 
format(s:any){
 return Utils.format(s);
}

toFixed(value:any,dec:number=1):any{
    let formated=Number(value).toFixed(dec);
    return formated;
}
}
