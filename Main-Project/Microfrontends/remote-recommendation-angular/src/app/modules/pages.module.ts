import { NgModule } from '@angular/core';
import { ComponentsModule } from './components.module';
import { HomeComponent } from '../pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
//import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
];

let remoteDecider =  RouterModule.forChild(routes);

if(window.location.port === "8081"){
  remoteDecider = RouterModule.forRoot(routes);
}

//const remoteDecider =  window.location.port === "8081" ? RouterModule.forRoot(routes): RouterModule.forChild(routes);

@NgModule({
  declarations: [
    //HomeComponent
  ],
  imports: [
    //CommonModule,
    ComponentsModule,
    remoteDecider,
    //RouterModule.forRoot(routes)
    //RouterModule.forChild(routes)
  ],
  exports: [
    ComponentsModule,
    RouterModule
  ]
})
export class PagesModule { }
