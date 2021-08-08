import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { MatListModule } from "@angular/material/list";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

import { AdministratoriusRoutingModule } from "./administratorius-routing.module";

import { PaslaugaService } from "./paslauga/paslauga.service";
import { RusisService } from "./rusis/rusis.service";
import { SpecialistasService } from "./darbuotojas/specialistas.service";
import { PaslaugaDarbuotojoService } from "./darbuotojas/paslauga-darbuotojo.service";

import { RusisComponent } from "./rusis/rusis.component";
import { DarbuotojasComponent } from "./darbuotojas/darbuotojas.component";
import { PaslaugaComponent } from "./paslauga/paslauga.component";
import { PerziuretiPaslaugaComponent } from "./paslauga/formos/perziureti-paslauga/perziureti-paslauga.component";
import { PridetiPaslaugaComponent } from "./paslauga/formos/prideti-paslauga/prideti-paslauga.component";
import { PerziuretiRusisComponent } from "./rusis/formos/perziureti-rusis/perziureti-rusis.component";
import { PridetiRusisComponent } from "./rusis/formos/prideti-rusis/prideti-rusis.component";
import { PridetiDarbuotojaComponent } from "./darbuotojas/prideti-darbuotoja/prideti-darbuotoja.component";
import { PerziuretiDarbuotojaComponent } from "./darbuotojas/perziureti-darbuotoja/perziureti-darbuotoja.component";

@NgModule({
  declarations: [
    /*components*/ RusisComponent,
    DarbuotojasComponent,
    PaslaugaComponent,
    PerziuretiPaslaugaComponent,
    PridetiPaslaugaComponent,
    PerziuretiRusisComponent,
    PridetiRusisComponent,
    PridetiDarbuotojaComponent,
    PerziuretiDarbuotojaComponent,
  ],
  imports: [
    CommonModule,
    AdministratoriusRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatToolbarModule,
    DragDropModule,
    MaterialFileInputModule,
    NgxDatatableModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule,
    MatAutocompleteModule,
  ],
  providers: [
    /*services*/ PaslaugaService,
    RusisService,
    SpecialistasService,
    PaslaugaDarbuotojoService,
  ],
})
export class AdministratoriusModule {}
