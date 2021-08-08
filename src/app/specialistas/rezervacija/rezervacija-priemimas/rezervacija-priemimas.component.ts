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

import { VizitasService } from "../../vizitas.service";
import { Vizitas } from "../../vizitas.model";

import { PerziuretiComponent } from "./formos/perziureti/perziureti.component";

@Component({
  selector: "app-rezervacija-priemimas",
  templateUrl: "./rezervacija-priemimas.component.html",
  styleUrls: ["./rezervacija-priemimas.component.sass"],
})
export class RezervacijaPriemimasComponent implements OnInit {
  rodomiStulpeliai = [
    "vardaspavarde",
    "telnr",
    "gyvunovardas",
    "gyvunocipas",
    "data",
    "busena",
  ];
  duomenuBaze: VizitasService | null;
  gautiDuomenys: DuomenuSaltinis | null;
  indeksas: number;
  id: number;
  Vizitai: Vizitas | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public vizitasService: VizitasService,
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

  redaguotiDuomenis(eilute) {
    this.id = eilute.id_specialistas;
    const dialogRef = this.dialog.open(PerziuretiComponent, {
      data: {
        vizitas: eilute,
        veiksmas: "redaguoti",
      },
      width: "1100px",
      //height: "750px",
      height: "480px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 2) {
        const foundIndex = this.duomenuBaze.duomenuKeitimas.value.findIndex(
          (x) => x.id_vizitas === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.duomenuBaze.duomenuKeitimas.value.splice(foundIndex, 1);
        this.atnaujintiLentele();
      }
    });
  }

  private atnaujintiLentele() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public uzkrautiDuomenis() {
    this.duomenuBaze = new VizitasService(this.httpClient);
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

export class DuomenuSaltinis extends DataSource<Vizitas> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  paieskosDuomenys: Vizitas[] = [];
  uzkrautiDuomenys: Vizitas[] = [];
  constructor(
    public duomenuBaze: VizitasService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Vizitas[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.duomenuBaze.duomenuKeitimas,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.duomenuBaze.gautiNepatvirtintusVizitus();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.paieskosDuomenys = this.duomenuBaze.duomenys
          .slice()
          .filter((vizitas: Vizitas) => {
            const paieskosTekstas = (
              vizitas.vardas +
              vizitas.pavarde +
              vizitas.telnr +
              vizitas.gyvunasvardas +
              vizitas.gyvunascipas
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
  sortData(duomenys: Vizitas[]): Vizitas[] {
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
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
