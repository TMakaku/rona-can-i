import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CanIComponent } from './can-i/can-i.component';
import { S1LottieModule } from '@sentinel-one/s1-lottie';

@NgModule({
  declarations: [
    AppComponent,
    CanIComponent
  ],
  imports: [
    BrowserModule, S1LottieModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
