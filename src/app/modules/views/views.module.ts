import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialShareModule } from '../material-share/material-share.module';
import { ProfileComponent } from 'src/app/views/profile/profile.component';
import { BlogComponent } from '../../views/blog/blog.component';



@NgModule({
  declarations: [ProfileComponent, BlogComponent],
  imports: [
    CommonModule,
    MaterialShareModule
  ]
})
export class ViewsModule { }
