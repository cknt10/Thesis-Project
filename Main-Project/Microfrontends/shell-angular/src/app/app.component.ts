import { Component, ComponentRef } from "@angular/core";
import { MicrofrontendService } from "./microfrontends/microfrontend.service";
import { LoginService } from "./services/login.service";
import { ActivatedRoute } from '@angular/router';

// @ts-ignore
import { mount } from 'searchbar/SearchbarApp';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  private currentChild: any;
  public isLoggedIn: boolean = false;

  constructor(
    public mfService: MicrofrontendService,
    private loginService: LoginService,
    private route: ActivatedRoute
    ) {
      //@ts-ignore
      window.JSLib = window.JSLib || [];
    }

  ngOnInit() {

    // @ts-ignore
    mount(document.querySelector('#searchbar_container'));
    this.tryLogin();
    // @ts-ignore
    window.JSLib.push(["init"]);
    console.log("init");
  }

  async tryLogin(){

    let success: boolean;

    let lastState = await this.loginService.defineUser();
    if(lastState === "logout"){
      success = await this.loginService.defineUser("logout") as boolean;
    }
    else if(lastState === "login"){
      this.isLoggedIn = true;
    }
  }

  async login(){

    let success: boolean;

    if(!this.isLoggedIn){
      
      console.log("try login");
      success = await this.loginService.defineUser("login") as boolean;
    }
    else{
      success = await this.loginService.defineUser("logout") as boolean;
    }
    if(success){
      console.log("Login/Logout completly successfull, user should get vip products too now");
      console.log("Rebuild MFE's in process...");

      this.route.queryParams.subscribe(params => {
        
        console.log("ehm", params);
      })

      // @ts-ignore
      mount(document.querySelector('#searchbar_container'));
      //buildSearchbar();
      this.currentChild.ngOnInit();
      this.isLoggedIn = !this.isLoggedIn;
    }
  }

  referenceToChild(componentReference: any){
    this.currentChild = componentReference;
    //console.log("newReference", componentReference, typeof componentReference);
  }
}
