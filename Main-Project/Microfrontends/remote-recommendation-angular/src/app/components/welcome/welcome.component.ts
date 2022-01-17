import { JsonpClientBackend } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public prefixUrl = 'https://kk-ck-microfrontend.s3.eu-central-1.amazonaws.com/content_bundles/';
  public fillerText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
  public list = [
    { headline: "Criminal Underworld-bundle", picture: `${this.prefixUrl}criminal_underworld.jpg`, text: this.fillerText },
    { headline: "Cyberpunk-bundle", picture: `${this.prefixUrl}cyberpunk.jpg`, text: this.fillerText },
    { headline: "Synthwave-bundle", picture: `${this.prefixUrl}synthwave.jpg`, text: this.fillerText },
  ];

  public v1 = false;

  constructor() {
  }

  ngOnInit(): void {
    // @ts-ignore
    //window.JSLib.push(["init"]);
    // @ts-ignore
    window.JSLib.push(["init","recommendation",(event) => {
      if(event.detail.data.recommendation.includes("v1")){
        this.v1 = true;
      }
    }]);

    setTimeout(()=>{
      // @ts-ignore
      window.JSLib.push(["eventBusGetVariations"]);

    },5000)
  }


  /*
  @HostListener('document:voodoo-get-variations', ['$event'])
  change(event: any) {
    console.log("gotEvent",event);
    if(event.detail.data.recommendation.includes("v1")){
      this.v1 = true;
    }
  }
  */

  getVariation(){

    console.log("get Variation");
    // @ts-ignore
    window.JSLib.push(["eventBusGetVariations"]);
  }


}
