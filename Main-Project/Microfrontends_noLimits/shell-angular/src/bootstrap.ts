import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

//import buildSearchbar from './react-middleware/searchbar';

//buildSearchbar();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

  /*
try{
  buildSearchbar();
} catch(err){
  console.log("missed searchbar", err);
}
*/
