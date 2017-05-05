import { AngularFire, AngularFireAuth } from 'angularfire2';
export class Utils {

/**Evalue une partie traitees*/
static setScore(partie:any,ref?:{af: AngularFire,uid:any}){
            if(!partie)
      return ;
   let score:number=0; let trueNb:number=0;let failedNb:number=0;
   let gTime:number=0;
   let firstScore:number=0;
   let analyse:any={};
//evaluation des scores et du temps
partie.questions.forEach(element => {
   element.nonSaved=true;
  if(this.isCorrect(element)){
        score+=element.note?element.note:2;
        trueNb+=1;
        }
  else
        failedNb+=1;
   if(this.isFirstCorrect(element))
        firstScore+=element.note?element.note:2; 
        gTime+=(element.restOfTime)?element.time-element.restOfTime:0;
         //console.log(element.time+' '+element.restOfTime);  
  });
partie.note=score;
analyse.note=score;


partie.firstNote=firstScore;  
analyse.firstNote=firstScore;

partie.time=gTime;
analyse.time=gTime;

partie.textTime=this.format(gTime);
analyse.textTime=this.format(gTime);

partie.trueNb=trueNb;
analyse.trueNb=trueNb;

partie.failedNb=failedNb;
analyse.failedNb=failedNb;


partie.objectif=this.setObjectif(partie);
analyse.objectif=this.setObjectif(partie);
partie.analyse=analyse;

if(ref)
  return ref.af.database.object('/parties/'+partie.id+'/result/'+ref.uid).update(partie.analyse);  
  return  analyse; 
}

/**Evalue les objectifs. chaque question etant liee a un objectif detaillee */
static setObjectif(partie:any){
//evaluation des objectifs
if(!partie.objectifs)
    return ;   
partie.objectifs.forEach(objectif => {
  objectif.done=true;
  partie.questions.forEach(question => {
     if((question.objectif.id==objectif.id)&&!this.isCorrect(question))
         objectif.done=false;
     });
}); 
let doneObjectifs:any[]=partie.objectifs.filter((objectif)=>{ return objectif.done; })
let objectif=doneObjectifs.length*100/partie.objectifs.length;

return objectif;
  
}


/**Evalue une matiere en fonction des parties considerees comme faites
 * L'evaluation ne prend en compte que les prties deja traitees et ignore celle pas encore traitees
 */
static setNotes(matiere:any,ref?:{af: AngularFire,uid:any}){
      if(!matiere)
      return ;
 let score:number=0, trueNb:number=0, failedNb:number=0;
 let gTime:number=0,  nbreParties:number=0, objectif:number=0; let analyse:any={};
 matiere.parties.forEach(partie => {
       if(this.canHasScore(partie)){
           this.setScore(partie);
           nbreParties+=1;
           score+=partie.note;
           trueNb+=partie.partie;
           failedNb+=partie.failedNb;
           objectif+=partie.objectif;
       }
  });
 matiere.note=(nbreParties)?score/nbreParties:null;
 analyse.note=(nbreParties)?score/nbreParties:null;

 matiere.objectif=(matiere.parties.length)?(objectif/matiere.parties.length):null;
 analyse.objectif=(matiere.parties.length)?(objectif/matiere.parties.length):null;

 matiere.programme=(matiere.parties.length)?(nbreParties*100/matiere.parties.length):null;
 analyse.programme=(matiere.parties.length)?(nbreParties*100/matiere.parties.length):null;

  matiere.analyse=analyse;
if(ref)
  return ref.af.database.object('/matieres/'+matiere.id+'/result/'+ref.uid).update(matiere.analyse);   
  return  analyse; 
}



static setData(concours:any,ref?:{af: AngularFire,uid:any}){
             if(!concours)
                return null ;     
      let programme:number=0, objectif:number=0, score:number=0,coef:number=0;  let analyse:any={};
     concours.matieres.forEach(matiere => {
              this.setNotes(matiere);
              programme+=matiere.programme;
              objectif+=matiere.objectif;
              score+=matiere.note*matiere.coef?matiere.coef:1;
              coef+=matiere.coef?matiere.coef:1
     });

 concours.programme=concours.matieres.length?(programme/concours.matieres.length).toFixed(1):null;
 analyse.programme=concours.matieres.length?(programme/concours.matieres.length).toFixed(1):null;

 concours.note=coef?(score/coef).toFixed(1):null
 analyse.note=coef?(score/coef).toFixed(1):null

 concours.objectif=concours.matieres.length?(objectif/concours.matieres.length).toFixed(1):null;
 analyse.objectif=concours.matieres.length?(objectif/concours.matieres.length).toFixed(1):null;
 
 concours.jourJ=345; //a calcluler
 analyse.jourJ=345; 
concours.analyse=analyse;
 if(ref)
  return ref.af.database.object('/concours/'+concours.id+'/result/'+ref.uid).update(concours.analyse);  
 return  analyse;  
}

/*Parcours pour voir le corrigé*/
static hasAmswer(question:any):boolean{
       return (question.amswer &&question.restOfTime<=0 )?true:question.restOfTime<=0;
}


/**Verifie si une partie peut etre considere comme faite ou pas */
static canHasScore(partie:any):boolean{
      if(!partie.questions ||!partie.questions.length)
         return false;
  partie.questions.forEach(question => {
     if( this.hasAmswer(question))
           return  true;
  });
   return  partie.note!=undefined?true:false;
}


/*Vrai si la reponse est celle de choisie */
static isThis(question:any,amswer:any):boolean{
  return (question.amswer==amswer);
}


/*Vrai si la reponse choisie est la bonne */
static isCorrect(question:any,amswer?:any):boolean{
      return amswer?(question.rep==amswer ):question.rep==question.amswer;
}


/*Vrai si la reponse choisie est la bonne */
static isFirstCorrect(question:any):boolean{
      return (question.rep==question.firstAmswer);
}

/**Affiche le temps en ms sous un format text */
static format(s,hrSep='h ',minSep='min'):string{
   let ms=s%1000;
   s=(s-ms)/1000;
   let secs=s%60;
   s=(s-secs)/60;
   let mins=s%60;
   let hrs=(s-mins)/60;mins
if(!hrs&&mins>0)
   return mins+minSep+secs;
if(!hrs&&!mins&&secs>0)
   return secs+'s';
if(!hrs&&!mins&&!secs)
   return ms+'ms';
return hrs+ hrSep+mins;
}


}