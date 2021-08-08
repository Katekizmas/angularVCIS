import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrisijungimasComponent } from './prisijungimas/prisijungimas.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PamirstasSlaptazodisComponent } from './pamirstas-slaptazodis/pamirstas-slaptazodis.component';
import { Puslapis404Component } from './puslapis404/puslapis404.component';
import { Puslapis500Component } from './puslapis500/puslapis500.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'prisijungimas',
    pathMatch: 'full'
  },
  {
    path: 'prisijungimas',
    component: PrisijungimasComponent
  },
  {
    path: 'registracija',
    component: RegistracijaComponent
  },
  {
    path: 'pamirstas-slaptazodis',
    component: PamirstasSlaptazodisComponent
  },
  {
    path: 'puslapis404',
    component: Puslapis404Component
  },
  {
    path: 'puslapis500',
    component: Puslapis500Component
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
