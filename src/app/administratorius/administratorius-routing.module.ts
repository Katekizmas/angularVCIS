import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Puslapis404Component } from '../autentifikacija/puslapis404/puslapis404.component';
import { DarbuotojasComponent } from './darbuotojas/darbuotojas.component';
import { PaslaugaComponent } from './paslauga/paslauga.component';
import { RusisComponent } from './rusis/rusis.component';
import { SkydelisComponent } from './skydelis/skydelis.component';

const routes: Routes = [
  {
    path: 'skydelis',
    component: SkydelisComponent,
  },
  {
    path: 'paslaugos',
    component: PaslaugaComponent,
  },
  {
    path: 'rusys',
    component: RusisComponent,
  },
  {
    path: 'darbuotojai',
    component: DarbuotojasComponent,
  },
  { path: '**', component: Puslapis404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratoriusRoutingModule {}
