import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariantcacherService {

  public v2 = false;

  constructor() {
    //console.log("FATTY CONST", this.v2);
    this.v2 = localStorage.getItem("bundleTest") === "v2";

    //console.log("FATTY CONST", this.v2, localStorage.getItem("bundleTest") === "v2");
  }
}
