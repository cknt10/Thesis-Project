import { NgModule } from '@angular/core';
import { ComponentsModule } from './components.module';
import { HomeComponent } from '../pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
//import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
];

 //const remoteDecider = process.env['NODE_ENV'] === "development" ? RouterModule.forRoot(routes): RouterModule.forChild(routes);

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    //CommonModule,
    ComponentsModule,
    //RouterModule.forRoot(routes)
    RouterModule.forChild(routes)
  ],
  exports: [
    ComponentsModule,
    RouterModule
  ]
})
export class PagesModule { }
