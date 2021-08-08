import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './autentifikacija-routing.module';
import { Puslapis500Component } from './puslapis500/puslapis500.component';
import { Puslapis404Component } from './puslapis404/puslapis404.component';
import { PrisijungimasComponent } from './prisijungimas/prisijungimas.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PamirstasSlaptazodisComponent } from './pamirstas-slaptazodis/pamirstas-slaptazodis.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    Puslapis500Component,
    Puslapis404Component,
    PrisijungimasComponent,
    RegistracijaComponent,
    PamirstasSlaptazodisComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AutentifikacijaModule {}
