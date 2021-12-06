import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './../app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { ProvidedPagesModule } from './providededPages.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ProvidedPagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class ProviderModule { }
