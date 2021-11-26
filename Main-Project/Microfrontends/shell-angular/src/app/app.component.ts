import { Component } from "@angular/core";
import { MicrofrontendService } from "./microfrontends/microfrontend.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(public mfService: MicrofrontendService) {}

  ngOnInit() {
    console.log("run my js here!!! 2");

    // @ts-ignore
    //window.initSearchBar();

    console.log("done!");
  }
}
