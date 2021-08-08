import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSortModule } from "@angular/material/sort";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { MatStepperModule } from "@angular/material/stepper";

import { SpecialistasRoutingModule } from "./specialistas-routing.module";
import { SkydelisComponent } from "./skydelis/skydelis.component";
import { KoncultacijaComponent } from "./koncultacija/koncultacija.component";
import { KalendoriusComponent } from "./kalendorius/kalendorius.component";
import { PerziuretiKalendoriusComponent } from "./kalendorius/perziureti-kalendorius/perziureti-kalendorius.component";

import { KalendoriusService } from "./kalendorius.service";
import { RezervacijaPerziuraComponent } from "./rezervacija/rezervacija-perziura/rezervacija-perziura.component";
import { RezervacijaPriemimasComponent } from "./rezervacija/rezervacija-priemimas/rezervacija-priemimas.component";
import { PerziuretiComponent } from "./rezervacija/rezervacija-priemimas/formos/perziureti/perziureti.component";
import { VizitasService } from "./vizitas.service";
import { PerziuretiRezComponent } from "./rezervacija/rezervacija-perziura/formos/perziureti-rez/perziureti-rez.component";
import { ZinuteService } from "./zinute.service";

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    SkydelisComponent,
    KoncultacijaComponent,
    KalendoriusComponent,
    PerziuretiKalendoriusComponent,
    RezervacijaPerziuraComponent,
    RezervacijaPriemimasComponent,
    PerziuretiComponent,
    PerziuretiRezComponent,
  ],
  imports: [
    CommonModule,
    SpecialistasRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgApexchartsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSortModule,
    MatTabsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    DragDropModule,

    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatStepperModule,
  ],
  providers: [KalendoriusService, VizitasService, ZinuteService],
})
export class SpecialistasModule {}
