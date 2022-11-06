import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialShareModule } from '../material-share/material-share.module';
import { ProfileComponent } from 'src/app/views/profile/profile.component';
import { BlogComponent } from '../../views/blog/blog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ProfileComponent, BlogComponent],
  imports: [
    CommonModule,
    MaterialShareModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [ProfileComponent, BlogComponent]
})
export class ViewsModule { }
