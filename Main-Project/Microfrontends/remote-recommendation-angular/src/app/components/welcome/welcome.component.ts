import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { VariantcacherService } from 'src/app/services/variantcacher.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public prefixUrl = 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/content_bundles/';
  public fillerText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
  public list = [
    { headline: "Criminal Underworld-bundle", picture: `${this.prefixUrl}criminal_underworld.jpg`, text: this.fillerText , class: "b_uw"},
    { headline: "Cyberpunk-bundle", picture: `${this.prefixUrl}cyberpunk.jpg`, text: this.fillerText , class: "b_cp" },
    { headline: "Synthwave-bundle", picture: `${this.prefixUrl}synthwave.jpg`, text: this.fillerText , class: "b_sw" },
  ];

  constructor(public cache: VariantcacherService) {
    console.log("v1",this.cache.v2);
  }


  ngOnInit(): void {
    // @ts-ignore
    window.JSLib.push(["add","recommendation","CK: A/B Test Relocation colorize-bundles",(event) =>{
      //for(let key in event){

        //if(event[key].experimentName === "CK: A/B Test Relocation colorize-bundles"){

          if(event.variant === 2){
            this.cache.v2 = true;

            localStorage.setItem("bundleTest","v2");
          }
        //}
      //}
    }]);

    console.log("push");
  }
}
