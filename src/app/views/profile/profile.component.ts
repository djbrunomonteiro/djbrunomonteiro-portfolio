import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { IWavs } from 'src/app/models/wavs';
import WaveSurfer from 'wavesurfer.js';
import { interval, Observable, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  step = 0;

  projects = [];

  wavRefs: IWavs[] = [];

  wavVolume = 0.7;
  maxVolume = 1;
  minVolume = 0;
  stepWav = 0.001;

  myBeats = [
    { name: 'wavRef1', wavColor: '#b3003b', curColor: '#ff1a66'},
    { name: 'wavRef2', wavColor: '#e60000', curColor: '#ff8080'},
    { name: 'wavRef3', wavColor: '#6600cc', curColor: '#a64dff'},
    { name: 'wavRef4', wavColor: '#000099', curColor: '#6666ff'},
  ];

  intervalsRef$: Subject<boolean> = new Subject<boolean>();


  timeUnsub$: any;

  constructor() {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.wavRefs = this.myBeats.map((item) => {
        const ref = WaveSurfer.create({
         container: `#${item.name}`,
         waveColor: item.wavColor,
         progressColor: item.curColor,
       });
       return {...item, ref, url: `assets/audios/${item.name}.wav`}
     });

     if(this.wavRefs.length){
      this.wavRefs.forEach(item =>{
        item.ref?.load(item.url);
      })
     }
    },2000)


  }

  playBeat(index: number){
    const wavRef = this.wavRefs[index].ref as WaveSurfer;
    if(wavRef.isPlaying()){
      this.timeUnsub$.unsubscribe()
    }
    wavRef.stop();
    wavRef.play();
    const time = interval(Number(wavRef.getDuration() * 1000));

    this.timeUnsub$ = time.pipe(takeUntil(this.intervalsRef$)).subscribe((res)=>{
      wavRef.stop();
      wavRef.play();
    })

  }

  stopAllBeats(){
    this.wavRefs.forEach(item =>{
      const wavRef = item.ref as WaveSurfer;
      wavRef.stop();
    });

    this.intervalsRef$.next(true);
  }

  controlVolume(event: MatSliderChange) {
    this.wavVolume = Number(event.value);
    this.wavRefs.forEach(item =>{
      const wavRef = item.ref as WaveSurfer;
      wavRef.setVolume(this.wavVolume)
    })
  }

  formatLabel(value: number) {
    return value * 1000;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setProjects() {}
}
