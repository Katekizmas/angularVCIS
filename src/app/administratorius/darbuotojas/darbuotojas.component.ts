import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  BehaviorSubject,
  fromEvent,
  fromEventPattern,
  merge,
  Observable,
} from "rxjs";
import { map } from "rxjs/operators";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { SelectionModel } from "@angular/cdk/collections";
import Swal from "sweetalert2";

import { PaslaugaDarbuotojoService } from "./paslauga-darbuotojo.service";
import { Specialistas } from "./specialistas.model";
import { SpecialistasService } from "./specialistas.service";
import { PridetiDarbuotojaComponent } from "./prideti-darbuotoja/prideti-darbuotoja.component";
import { PerziuretiDarbuotojaComponent } from "./perziureti-darbuotoja/perziureti-darbuotoja.component";

@Component({
  selector: "app-darbuotojas",
  templateUrl: "./darbuotojas.component.html",
  styleUrls: ["./darbuotojas.component.sass"],
})
export class DarbuotojasComponent implements OnInit {
  rodomiStulpeliai = ["vardaspavarde", "telnr", "pastas", "pareigos"];
  duomenuBaze: SpecialistasService | null;
  gautiDuomenys: DuomenuSaltinis | null;
  indeksas: number;
  id: number;
  specialistai: Specialistas | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public specialistasService: SpecialistasService,
    public paslaugaDarbuotojoService: PaslaugaDarbuotojoService,
    private snackBar: MatSnackBar
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit() {
    this.uzkrautiDuomenis();
  }
  atnaujinti() {
    this.uzkrautiDuomenis();
  }

  pridetiDuomenis() {
    const dialogRef = this.dialog.open(PridetiDarbuotojaComponent, {
      data: {
        specialistas: this.specialistai,
        veiksmas: "prideti",
      },
      width: "700px",
      height: "650px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.duomenuBaze.duomenuKeitimas.value.unshift(
          this.specialistasService.getFormosDuomenis()
        );
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "snackbar-success",
          "Sėkmingai pridėjote darbuotoją",
          "bottom",
          "center"
        );
      }
    });
  }
  redaguotiDuomenis(eilute) {
    this.id = eilute.id_specialistas;
    const dialogRef = this.dialog.open(PerziuretiDarbuotojaComponent, {
      data: {
        specialistas: eilute,
        veiksmas: "redaguoti",
      },
      width: "700px",
      height: "650px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.duomenuBaze.duomenuKeitimas.value.findIndex(
          (x) => x.id_specialistas === this.id
        );
        // Then you update that record using data from formosDuomenys (values you entered)
        this.duomenuBaze.duomenuKeitimas.value[foundIndex] =
          this.specialistasService.getFormosDuomenis();
        // And lastly refresh table
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "black",
          "Sėkmingai pakoregavote darbuotojo duomenis",
          "bottom",
          "center"
        );
      } else if (result === 2) {
        const foundIndex = this.duomenuBaze.duomenuKeitimas.value.findIndex(
          (x) => x.id_specialistas === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.duomenuBaze.duomenuKeitimas.value.splice(foundIndex, 1);
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "snackbar-danger",
          "Sėkmingai ištrynėte darbuotoją",
          "bottom",
          "center"
        );
      }
    });
  }

  private atnaujintiLentele() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public uzkrautiDuomenis() {
    this.duomenuBaze = new SpecialistasService(
      this.httpClient,
      this.paslaugaDarbuotojoService
    );
    this.gautiDuomenys = new DuomenuSaltinis(
      this.duomenuBaze,
      this.paginator,
      this.sort
    );
    fromEvent(this.filter.nativeElement, "keyup").subscribe(() => {
      if (!this.gautiDuomenys) {
        return;
      }
      this.gautiDuomenys.filter = this.filter.nativeElement.value;
    });
  }
  rodytiPranesima(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}

export class DuomenuSaltinis extends DataSource<Specialistas> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  paieskosDuomenys: Specialistas[] = [];
  uzkrautiDuomenys: Specialistas[] = [];
  constructor(
    public duomenuBaze: SpecialistasService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Specialistas[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.duomenuBaze.duomenuKeitimas,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.duomenuBaze.getSpecialistus();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.paieskosDuomenys = this.duomenuBaze.duomenys
          .slice()
          .filter((specialistas: Specialistas) => {
            const paieskosTekstas = (
              specialistas.vardas +
              specialistas.pavarde +
              specialistas.pastas +
              specialistas.telnr
            ).toLowerCase();

            return paieskosTekstas.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.paieskosDuomenys.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.uzkrautiDuomenys = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.uzkrautiDuomenys;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(duomenys: Specialistas[]): Specialistas[] {
    if (!this._sort.active || this._sort.direction === "") {
      return duomenys;
    }
    return duomenys.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "vardas":
          [propertyA, propertyB] = [a.vardas, b.vardas];
          break;
        case "pavarde":
          [propertyA, propertyB] = [a.pavarde, b.pavarde];
          break;
        case "pastas":
          [propertyA, propertyB] = [a.pastas, b.pastas];
          break;
        case "telnr":
          [propertyA, propertyB] = [a.telnr, b.telnr];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
