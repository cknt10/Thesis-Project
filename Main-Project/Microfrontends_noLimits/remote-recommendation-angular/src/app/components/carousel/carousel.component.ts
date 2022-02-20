import { Component, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceProperty } from 'src/app/enums/DeviceProperty';
import { ProductCard } from 'src/app/interfaces/ProductCard';
import { DeviceDeciderService } from 'src/app/services/helpers/device-decider.service';

import SwiperCore, { EffectCoverflow, Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// install Swiper modules
SwiperCore.use([EffectCoverflow, Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements OnInit {

  viewport: Subscription;

  public isLoading: boolean = true;

  @Input() set items(items: ProductCard[]){
    console.log("detect change", `items length = ${this._items.length}`);
    this._items = items;
    if(this._items.length > 0) this.isLoading = false;
    console.log("new items", items.length);
  }

  @HostListener('window:resize', ['$event'])
  callService(){
    this._devicedecider.onResize();
  }

  _items: ProductCard[];

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  slideNext(){
    this.swiper?.swiperRef.slideNext(100);
  }
  slidePrev(){
    this.swiper?.swiperRef.slidePrev(100);
  }

  constructor(private _devicedecider: DeviceDeciderService) {
    this.isLoading = true;
    this._items = [];

    this.viewport = this._devicedecider.device.subscribe(device => {
      this.config = this.calculateSlider(device);
      this.swiper?.initSwiper();
    });
   }

  ngOnInit(): void {

  }

  onSwiper(event: Event){
    //console.log("Swipe", event);
  }

  onSlideChange(){
    //console.log("onSlideChange");
  }

  calculateSlider(device: DeviceProperty): SwiperOptions{
    console.log("my device", device);
    return {
      slidesPerView: ((device ==="mobile")?2:(device ==="tablet" || device === "desktop_small")?3:4),
      spaceBetween: ((device ==="mobile")?16:(device ==="tablet" || device === "desktop_small")?28:80),
      navigation: {
        nextEl: '.next-slide',
        prevEl: '.previous-slide',
      },
      pagination: { clickable: true },
      scrollbar: { draggable: true },
    }
  }

}
