import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { loadRemoteModule } from "./utils/federation-utils";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "profile",
    loadChildren: () =>
      loadRemoteModule({
        remoteName: "profile",
        remoteEntry: "http://localhost:4201/remoteEntry.js",
        exposedModule: "ProfileModule",
      }).then((m) => m.ProfileModule),
  },
  {
    path: "home",
    loadChildren: () =>
      loadRemoteModule({
        remoteName: "home",
        remoteEntry: "http://localhost:8081/remoteEntry.js",
        exposedModule: "AppModule",
      }).then((m) => m.AppModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
