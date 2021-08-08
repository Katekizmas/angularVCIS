import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Puslapis404Component } from "./autentifikacija/puslapis404/puslapis404.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { Role } from "./core/models/role";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "/autentifikacija/prisijungimas",
        pathMatch: "full",
      },
      {
        path: "administratorius",
        canActivate: [AuthGuard],
        data: {
          role: [Role.Admin],
        },
        loadChildren: () =>
          import("./administratorius/administratorius.module").then(
            (m) => m.AdministratoriusModule
          ),
      },
      {
        path: "specialistas",
        canActivate: [AuthGuard],
        data: {
          role: [Role.Doctor, Role.Admin],
        },
        loadChildren: () =>
          import("./specialistas/specialistas.module").then(
            (m) => m.SpecialistasModule
          ),
      },
      {
        path: "seimininkas",
        canActivate: [AuthGuard],
        data: {
          role: [Role.Patient, Role.Doctor, Role.Admin],
        },
        loadChildren: () =>
          import("./seimininkas/seimininkas.module").then(
            (m) => m.SeimininkasModule
          ),
      },
    ],
  },
  {
    path: "autentifikacija", // arba '' tuscias kelias gal geriau bus..?
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./autentifikacija/autentifikacija.module").then(
        (m) => m.AutentifikacijaModule
      ),
  },
  { path: "**", component: Puslapis404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
