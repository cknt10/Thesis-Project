import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'landingpage';

  ngOnitInit(){
    // @ts-ignore
    window.JSLib.push(["add","recommendation","CK: A/B Test Relocation colorize-bundles"]);

  }
}
