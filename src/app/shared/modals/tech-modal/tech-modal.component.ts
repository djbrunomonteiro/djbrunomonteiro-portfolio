import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tech-modal',
  templateUrl: './tech-modal.component.html',
  styleUrls: ['./tech-modal.component.scss']
})
export class TechModalComponent implements OnInit {

  tech = {
    angular: '^13.3.9',
    angular_material: '^13.3.9',
    bootstrap: '^5.2.2',
    bootstrap_icons: '^1.9.1',
    rxjs: '~7.5.0',
    tslib: '^2.3.0',
    git: '~2.25.1',
    jasmine: '~4.0.0',
    karma: '~6.3.0',
    typescript: '~4.6.2',
    vscode: '~1.72.2'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
