import { JsonpClientBackend } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { timeout } from 'rxjs';
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
    console.log("v1",this.cache.v1);
  }


  ngOnInit(): void {

  }
}
