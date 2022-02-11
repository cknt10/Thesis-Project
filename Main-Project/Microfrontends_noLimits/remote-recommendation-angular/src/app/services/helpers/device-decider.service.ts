import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeviceProperty } from 'src/app/enums/DeviceProperty';

@Injectable({
  providedIn: 'root'
})
export class DeviceDeciderService {

  device: BehaviorSubject<DeviceProperty>;

  constructor() {
    this.device = new BehaviorSubject<DeviceProperty>(DeviceProperty.desktop_small);
    this.onResize();
   }

   /**
    *
    * @param User Caroussel-Component
    */
  onResize() {
    //calculate
    const width = window.innerWidth;

   if(width<768){
    console.log("isMobile");
     this.device.next(DeviceProperty.mobile);
   }
   else if(width >= 768 && width < 1024){
    console.log("isTablet");
    this.device.next(DeviceProperty.tablet);
   }
   else if(width >= 1024 && width < 1280){
    console.log("isDesktop (small)");
    this.device.next(DeviceProperty.desktop_small);
   }
   else if(width >= 1280){
    console.log("isDesktop (big)");
    this.device.next(DeviceProperty.desktop_big);
   }
   console.log("in service", this.device, width);
  }
}
