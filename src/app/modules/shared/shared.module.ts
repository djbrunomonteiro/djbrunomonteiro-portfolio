import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MaterialShareModule } from '../material-share/material-share.module';
import { TechModalComponent } from '../../shared/modals/tech-modal/tech-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TechModalComponent
  ],
  imports: [
    CommonModule,
    MaterialShareModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TechModalComponent
  ]
})
export class SharedModule { }
