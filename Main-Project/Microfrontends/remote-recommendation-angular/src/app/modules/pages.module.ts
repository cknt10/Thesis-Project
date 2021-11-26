import { NgModule } from '@angular/core';
import { ComponentsModule } from './components.module';
import { LandingPageComponent } from '../pages/landing-page/landing-page.component';
import { RouterModule, Routes } from '@angular/router';
//import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'home', component: LandingPageComponent },
];

 //const remoteDecider = process.env['NODE_ENV'] === "development" ? RouterModule.forRoot(routes): RouterModule.forChild(routes);

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    //CommonModule,
    ComponentsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    ComponentsModule,
    RouterModule
  ]
})
export class PagesModule { }
