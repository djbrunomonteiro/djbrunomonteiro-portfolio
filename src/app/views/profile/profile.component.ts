import { UtilsService } from './../../services/utils.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatLegacySliderChange as MatSliderChange } from '@angular/material/legacy-slider';
import { IWavs } from 'src/app/models/wavs';
import WaveSurfer from 'wavesurfer.js';
import { interval, Observable, Subject, take, takeUntil } from 'rxjs';
import { WaveSurferPlugin } from 'wavesurfer.js/types/plugin';
import MarkersPlugin from 'wavesurfer.js/src/plugin/markers';
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
    { name: 'base-1', wavColor: '#b3003b', curColor: '#ff1a66' },
    { name: 'base-2', wavColor: '#e60000', curColor: '#ff8080' },
    { name: 'base-3', wavColor: '#6600cc', curColor: '#a64dff' },
    { name: 'base-4', wavColor: '#000099', curColor: '#6666ff' },
  ];

  intervalsRef$: Subject<boolean> = new Subject<boolean>();

  timeUnsub$: any;

  indexRandom = 1;

  constructor(
    public utilsService: UtilsService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.wavRefs = this.myBeats.map((item) => {
        const ref = WaveSurfer.create({
          container: `#${item.name}`,
          waveColor: item.wavColor,
          progressColor: item.curColor,
          normalize: true,
          plugins: [
            MarkersPlugin.create({
              markers: [
              ],
            }),
          ],
        });

        return { ...item, ref, url: `assets/audios/${item.name}.ogg` };
      });

      if (this.wavRefs.length) {
        this.wavRefs.forEach((item) => {
          item.ref?.load(item.url);
        });
      }
    }, 1000);

  }


  playBeat(index: number) {
    const wavRef = this.wavRefs[index].ref as WaveSurfer;

    if (wavRef.isPlaying()) {
      this.timeUnsub$.unsubscribe();
    }
    wavRef.stop();
    wavRef.play();
    const time = interval(Number(wavRef.getDuration() * 1000));

    this.timeUnsub$ = time
      .pipe(takeUntil(this.intervalsRef$))
      .subscribe((res) => {
        wavRef.stop();
        wavRef.play();
      });
  }

  playRandom() {
    this.stopAllBeats();
    const index = Math.floor(Math.random() * this.myBeats.length);
    console.log(index);
    if (index === this.indexRandom) {
      this.indexRandom = index;
      switch (index) {
        case 0:
          this.playBeat(1);
          break;
        case 1:
          this.playBeat(2);
          break;
        case 2:
          this.playBeat(3);
          break;
        case 3:
          this.playBeat(0);
          break;
      }
    } else {
      this.playBeat(index);
      this.indexRandom = index;
    }
  }

  checkIsPlaying(index: number) {
    if (this.wavRefs.length) {
      const wavRef = this.wavRefs[index].ref as WaveSurfer;
      return wavRef.isPlaying();
    } else {
      return false;
    }
  }

  stopAllBeats() {
    this.wavRefs.forEach((item) => {
      const wavRef = item.ref as WaveSurfer;
      wavRef.stop();
    });

    this.intervalsRef$.next(true);
  }

  pauseBeat(index: number) {
    const wavRef = this.wavRefs[index].ref as WaveSurfer;
    if (wavRef.isPlaying()) {
      this.timeUnsub$.unsubscribe();
      wavRef.stop();
    } else {
      this.playBeat(index);
    }
  }

  isPause(index: number) {
    const wavRef = this.wavRefs[index].ref as WaveSurfer;
    return wavRef.isPlaying();
  }

  controlVolume(event: MatSliderChange) {
    this.wavVolume = Number(event.value);
    this.wavRefs.forEach((item) => {
      const wavRef = item.ref as WaveSurfer;
      wavRef.setVolume(this.wavVolume);
    });
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
