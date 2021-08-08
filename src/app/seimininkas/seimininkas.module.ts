import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatTabsModule } from "@angular/material/tabs";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatTooltipModule } from "@angular/material/tooltip";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { SeimininkasRoutingModule } from "./seimininkas-routing.module";
import { SkydelisComponent } from "./skydelis/skydelis.component";
import { GyvunaiComponent } from "./gyvunai/gyvunai.component";
import { GyvunaiService } from "./gyvunai/gyvunai.service";
import { RusisService } from "./gyvunai/rusis.service";
import { IstorijaService } from "./gyvunai/formos/istorija-skiepas/istorija.service";
import { SkiepasService } from "./gyvunai/formos/istorija-skiepas/skiepas.service";
import { VizitasService } from "./vizitas/vizitas.service";
import { PaslaugaService } from "./vizitas/paslauga.service";

import { PerziuretiComponent } from "./gyvunai/formos/perziureti/perziureti.component";
import { PridetiComponent } from "./gyvunai/formos/prideti/prideti.component";
import { IstorijaSkiepasComponent } from "./gyvunai/formos/istorija-skiepas/istorija-skiepas.component";
import { PerziuretiIstorijaComponent } from "./gyvunai/formos/istorija-skiepas/perziureti-istorija/perziureti-istorija.component";
import { VizitasComponent } from "./vizitas/vizitas.component";
import { RezervacijaComponent } from "./vizitas/rezervacija/rezervacija.component";
import { PerziuretiRezervacijaComponent } from "./vizitas/perziureti-rezervacija/perziureti-rezervacija.component";
import { KoncultacijaComponent } from "./koncultacija/koncultacija.component";
import { ZinuteService } from "../specialistas/zinute.service";

@NgModule({
  declarations: [
    SkydelisComponent,
    GyvunaiComponent,
    PerziuretiComponent,
    PridetiComponent,
    IstorijaSkiepasComponent,
    PerziuretiIstorijaComponent,
    VizitasComponent,
    RezervacijaComponent,
    PerziuretiRezervacijaComponent,
    KoncultacijaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSortModule,
    MatCheckboxModule,
    MatToolbarModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,

    chartjsModule,
    NgxEchartsModule,
    MatTabsModule,
    NgApexchartsModule,
    MatTooltipModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    PerfectScrollbarModule,

    SeimininkasRoutingModule,
  ],
  providers: [
    GyvunaiService,
    RusisService,
    IstorijaService,
    SkiepasService,
    VizitasService,
    PaslaugaService,
    ZinuteService,
  ],
})
export class SeimininkasModule {}
