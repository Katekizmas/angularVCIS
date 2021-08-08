import { Puslapis404Component } from "../autentifikacija/puslapis404/puslapis404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SkydelisComponent } from "./skydelis/skydelis.component";
import { KoncultacijaComponent } from "./koncultacija/koncultacija.component";
import { KalendoriusComponent } from "./kalendorius/kalendorius.component";
import { RezervacijaPriemimasComponent } from "./rezervacija/rezervacija-priemimas/rezervacija-priemimas.component";
import { RezervacijaPerziuraComponent } from "./rezervacija/rezervacija-perziura/rezervacija-perziura.component";

const routes: Routes = [
  {
    path: "skydelis",
    component: SkydelisComponent,
  },
  {
    path: "kalendorius",
    component: KalendoriusComponent,
  },
  {
    path: "konsultacija",
    component: KoncultacijaComponent,
  },
  {
    path: "rezervacija-priemimas",
    component: RezervacijaPriemimasComponent,
  },
  {
    path: "rezervacija-perziura",
    component: RezervacijaPerziuraComponent,
  },

  { path: "**", component: Puslapis404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialistasRoutingModule {}
