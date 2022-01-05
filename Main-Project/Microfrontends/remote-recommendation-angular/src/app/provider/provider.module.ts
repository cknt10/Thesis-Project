import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './../app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { ProvidedPagesModule } from './providedPages.module';
import { ComponentsModule } from '../modules/components.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    ProvidedPagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class ProviderModule { }
