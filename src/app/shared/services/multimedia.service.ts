import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, min, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback:EventEmitter<any> = new EventEmitter<any>();
  
  //myObservable1$:Observable<any> = new Observable();
  //myObservable1$:Subject<any> = new Subject();
//  myObservable1$:BehaviorSubject<any> = new BehaviorSubject('aguaaa');

  public trackInfo$:BehaviorSubject<any>= new BehaviorSubject(undefined);
  public audio!:HTMLAudioElement;
  public timeElapsed$:BehaviorSubject<string>= new BehaviorSubject('00:00');
  public timeRemaining$:BehaviorSubject<string>= new BehaviorSubject('-00:00');
  public playerStatus$:BehaviorSubject<string>= new BehaviorSubject('paused');
  public playerPercentage$:BehaviorSubject<number>= new BehaviorSubject(0);

  constructor() { 
    this.audio = new Audio();
    this.trackInfo$.subscribe(responseOk=>{    
      if(responseOk){
        this.setAudio(responseOk);
      }
      
    })
    /*
    un subject es un observer y un observable a la vez
    setTimeout(() => {
      this.myObservable1$.next('enviando aguitaa');  
    }, 1000);
*/ 
    /*
    un observable tiene un siguiente valor, un complete para completado y un posible error
    que se pueden manejar por el observer
    this.myObservable1$ = new Observable(
      (observer:Observer<any>)=>{
          observer.next(' awa');

          setTimeout(() => {
            observer.next(' awa'); 
          }, 2500);

          setTimeout(() => {
            observer.error('x'); 
          }, 3500);
      }
    )*/
    this.listenAllEvents();
  }

  private listenAllEvents():void{
    this.audio.addEventListener('timeupdate',this.calculeTime, false);
    this.audio.addEventListener('playing',this.setPlayerStatus, false);
    this.audio.addEventListener('play',this.setPlayerStatus, false);
    this.audio.addEventListener('pause',this.setPlayerStatus, false);
    this.audio.addEventListener('ended',this.setPlayerStatus, false);

  }

  private setPlayerStatus = (state:any) =>{
    switch(state.type){
      case 'play':
        this.playerStatus$.next('play')
      break;
      case 'playing':
        this.playerStatus$.next('playing')
      break;
      case 'ended':
        this.playerStatus$.next('ended')
      break;
      default:
        this.playerStatus$.next('paused')
      break;
    }
  }


  private calculeTime = () =>{    
    const {duration, currentTime} = this.audio;
    //console.table([duration, currentTime]);
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  }

  private setPercentage(currentTime:number, duration:number):void{
    let percetage = (currentTime *100)/duration;
    this.playerPercentage$.next(percetage);
  }

  private setTimeElapsed(currentTime:number):void{
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor(currentTime /60)%60;

    const displaySeconds = (seconds < 10) ? `0${seconds}`:seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}`:minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeElapsed$.next(displayFormat);

  }

  private setTimeRemaining(currentTime:number, duration:number):void{
    let timeLeft = duration - currentTime;

    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor(timeLeft /60) % 60;

    const displaySeconds = (seconds < 10) ? `0${seconds}`:seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}`:minutes;

    const displayFormat = `-${displayMinutes}:${displaySeconds}`;    
    this.timeRemaining$.next(displayFormat);

  }

  //Funciones publicas
  public setAudio(track:TrackModel):void{
    this.audio.src = track.url;
    this.audio.play();
  }

  public togglePlayer():void{
    (this.audio.paused)? this.audio.play():this.audio.pause();
  }

  public seekAudio(percentaje:number):void{
    const {duration} = this.audio;
    const percentageToSecond = (percentaje * duration)/100;
    this.audio.currentTime = percentageToSecond;
  }
}
