import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TechModalComponent } from '../modals/tech-modal/tech-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  technologies = []

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openTech(){
    this.dialog.open(TechModalComponent);
  }

}
