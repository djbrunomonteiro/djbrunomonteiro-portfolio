import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { MaterialShareModule } from './modules/material-share/material-share.module';
import { ViewsModule } from './modules/views/views.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ViewsModule,
    MaterialShareModule,
    SharedModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'pt' },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
