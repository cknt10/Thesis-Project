import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PagesModule } from './modules/pages.module';

@NgModule({
  declarations: [
    //AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
