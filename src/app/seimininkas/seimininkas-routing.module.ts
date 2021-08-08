import { Puslapis404Component } from "../autentifikacija/puslapis404/puslapis404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SkydelisComponent } from "./skydelis/skydelis.component";
import { GyvunaiComponent } from "./gyvunai/gyvunai.component";
import { VizitasComponent } from "./vizitas/vizitas.component";
import { RezervacijaComponent } from "./vizitas/rezervacija/rezervacija.component";
import { KoncultacijaComponent } from "./koncultacija/koncultacija.component";

const routes: Routes = [
  {
    path: "skydelis",
    component: SkydelisComponent,
  },
  {
    path: "gyvunai",
    component: GyvunaiComponent,
  },
  {
    path: "vizitai-istorija",
    component: VizitasComponent,
  },
  {
    path: "vizitai-rezervacija",
    component: RezervacijaComponent,
  },
  {
    path: "konsultacija",
    component: KoncultacijaComponent,
  },
  { path: "**", component: Puslapis404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeimininkasRoutingModule {}
