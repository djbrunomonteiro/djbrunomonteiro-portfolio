import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { setTimeout } from 'timers';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  step = 0;

  projects = [];

  wavRef: WaveSurfer | undefined;

  wavRefs = [
    { name: 'wavRef1'},
    { name: 'wavRef2'},
    { name: 'wavRef3'},
    { name: 'wavRef4'},

  ]



  wavVolume = 0.7;
  maxVolume = 1;
  minVolume = 0;
  stepWav = 0.001;

  myBeats = [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    this.wavRefs.map((item) => {
      const ref = WaveSurfer.create({
       container: item.name,
       waveColor: 'violet',
       progressColor: 'purple',
     });

     return {...item, ref}
   });

   console.log(this.wavRefs);

    // console.log('wavs', this.wavRefs );
    

    this.wavRef = WaveSurfer.create({
      container: '#waveform1',
      waveColor: 'violet',
      progressColor: 'purple',
    });
    if (this.wavRef) {
      this.wavRef.load('assets/audios/teste.mp3');
      console.log(this.wavRef);
      this.wavRef.on('ready', () => {
        // this.wavRef?.play();
      });
    }
  }

  controlVolume(event: MatSliderChange) {

    this.wavVolume = Number(event.value);

    if (this.wavRef && this.wavVolume) {
      this.wavRef?.setVolume(this.wavVolume);
    }
  }

  formatLabel(value: number) {
    console.log(value);

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
