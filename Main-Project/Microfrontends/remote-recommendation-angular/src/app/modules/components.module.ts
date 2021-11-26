import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

import { CarouselComponent } from '../components/carousel/carousel.component';
import { CardComponent } from '../components/carousel/card/card.component';

import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SwiperModule
  ],
  declarations: [
    CarouselComponent,
    CardComponent,
  ],
  exports: [
    CarouselComponent,
    CardComponent,
    CommonModule
  ]
})
export class ComponentsModule { }
