import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//import { HomeComponent } from "./home/home.component";
import { loadRemoteModule } from "./utils/federation-utils";

  //{ path: "home", component: HomeComponent },

  
const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      loadRemoteModule({
        remoteName: "home",
        remoteEntry: "http://localhost:8081/remoteEntry.js",
        exposedModule: "AppModule",
      }).then(m => m.AppModule),
  },
  /*{
    path: "home",
    loadChildren: () =>
      loadRemoteModule({
        remoteName: "recommendation",
        remoteEntry: "http://localhost:8081/remoteEntry.js",
        exposedModule: "AppModule",
      }).then(m => m.AppModule),

  },*/
  {
    path: "pdp",
    loadChildren: () =>
      loadRemoteModule({
        remoteName: "pdp",
        remoteEntry: "http://localhost:8084/remoteEntry.js",
        exposedModule: "AppModule",
      }).then((m) => m.AppModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
