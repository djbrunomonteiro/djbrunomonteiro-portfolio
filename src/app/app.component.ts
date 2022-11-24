import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DJBrunomonteiro';

  constructor(private titleRef: Title ){
    this.titleRef.setTitle(this.title)

  }
}
