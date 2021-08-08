import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { SelectionModel } from "@angular/cdk/collections";
import Swal from "sweetalert2";

import { KalendoriusService } from "../../kalendorius.service";
import { Kalendorius } from "../../kalendorius.model";

import { PerziuretiRezComponent } from "./formos/perziureti-rez/perziureti-rez.component";

@Component({
  selector: "app-rezervacija-perziura",
  templateUrl: "./rezervacija-perziura.component.html",
  styleUrls: ["./rezervacija-perziura.component.sass"],
})
export class RezervacijaPerziuraComponent implements OnInit {
  rodomiStulpeliai = [
    "vardaspavarde",
    "telnr",
    "gyvunovardas",
    "gyvunocipas",
    "data",
    "busena",
  ];
  duomenuBaze: KalendoriusService | null;
  gautiDuomenys: DuomenuSaltinis | null;
  indeksas: number;
  id: number;
  Kalendoriai: Kalendorius | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public kalendoriusService: KalendoriusService,
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

  perziuretiDuomenis(eilute) {
    const dialogRef = this.dialog.open(PerziuretiRezComponent, {
      data: {
        vizitas: eilute,
      },
      width: "1100px",
      //height: "750px",
    });
  }
  public uzkrautiDuomenis() {
    this.duomenuBaze = new KalendoriusService(this.httpClient);
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

export class DuomenuSaltinis extends DataSource<Kalendorius> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  paieskosDuomenys: Kalendorius[] = [];
  uzkrautiDuomenys: Kalendorius[] = [];
  constructor(
    public duomenuBaze: KalendoriusService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Kalendorius[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.duomenuBaze.duomenuKeitimas,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.duomenuBaze.getVizituIstorija();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.paieskosDuomenys = this.duomenuBaze.duomenys
          .slice()
          .filter((vizitas: Kalendorius) => {
            const paieskosTekstas = (
              vizitas.vardas +
              vizitas.pavarde +
              vizitas.telnr +
              vizitas.gyvunasvardas +
              vizitas.gyvunascipas +
              vizitas.vizitasbusena
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
  sortData(duomenys: Kalendorius[]): Kalendorius[] {
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
        case "telnr":
          [propertyA, propertyB] = [a.telnr, b.telnr];
          break;
        case "gyvunasvardas":
          [propertyA, propertyB] = [a.gyvunasvardas, b.gyvunasvardas];
          break;
        case "gyvunascipas":
          [propertyA, propertyB] = [a.gyvunascipas, b.gyvunascipas];
          break;
        case "vizitasbusena":
          [propertyA, propertyB] = [a.vizitasbusena, b.vizitasbusena];
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
