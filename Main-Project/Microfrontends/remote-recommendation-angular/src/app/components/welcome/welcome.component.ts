import { Component, HostListener, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('event-bus:get-variations', ['$event'])
  change(event: Event) {
    console.log("gotEvent",event);
  }

  getVariation(){

    console.log("get Variation");
    // @ts-ignore
    eventBusGetVariations();
  }


}
