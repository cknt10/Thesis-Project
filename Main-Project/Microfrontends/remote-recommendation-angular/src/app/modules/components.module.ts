import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

import { CarouselComponent } from '../components/carousel/carousel.component';
import { CardComponent } from '../components/carousel/card/card.component';

import { SwiperModule } from 'swiper/angular';
import { BannerComponent } from '../components/banner/banner.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SwiperModule
  ],
  declarations: [
    CarouselComponent,
    CardComponent,
    BannerComponent
  ],
  exports: [
    CarouselComponent,
    CardComponent,
    CommonModule,
    BannerComponent
  ]
})
export class ComponentsModule { }
