import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MicrofrontendService } from "./microfrontends/microfrontend.service";
import { LoginService } from "./services/login.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(public mfService: MicrofrontendService, private loginService: LoginService) {}

  ngOnInit() {
  }

  async login(){
    console.log("try login");
    let success = await this.loginService.login();
    if(success){
      console.log("Login completly successfull, user should get vip products too now")
    }
  }
}
