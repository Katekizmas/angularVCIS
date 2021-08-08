import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { GyvunaiService } from "./gyvunai.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Gyvunai } from "./gyvunai.model";
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
import { PerziuretiComponent } from "./formos/perziureti/perziureti.component";
import { PridetiComponent } from "./formos/prideti/prideti.component";
import { IstorijaSkiepasComponent } from "./formos/istorija-skiepas/istorija-skiepas.component";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-gyvunai",
  templateUrl: "./gyvunai.component.html",
  styleUrls: ["./gyvunai.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class GyvunaiComponent implements OnInit {
  rodomiStulpeliai = [
    //"id_gyvunas",
    "vardas",
    "gimimometai",
    "veisle",
    "lytis",
    "rusis",
    "cipas",
    "veiksmai",
  ];
  duomenuBaze: GyvunaiService | null;
  gautiDuomenys: DuomenuSaltinis | null;
  indeksas: number;
  id: number;
  gyvunai: Gyvunai | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public gyvunaiService: GyvunaiService,
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

  atidarytiIstorijaSkiepas(eilute) {
    this.id = eilute.id_gyvunas;
    const dialogRef = this.dialog.open(IstorijaSkiepasComponent, {
      data: {
        gyvunas: eilute,
        veiksmas: "perziureti",
      },
      //height: '600px',
      width: "800px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.duomenuBaze.duomenuKeitimas.value.findIndex(
          (x) => x.id_gyvunas === this.id
        );
        // Then you update that record using data from formosDuomenys (values you entered)
        this.duomenuBaze.duomenuKeitimas.value[foundIndex] =
          this.gyvunaiService.getFormosDuomenis();
        // And lastly refresh table
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "black",
          "Sėkmingai pakoregavote gyvūno duomenis",
          "bottom",
          "center"
        );
      }
    });
  }

  pridetiDuomenis() {
    const dialogRef = this.dialog.open(PridetiComponent, {
      data: {
        gyvunas: this.gyvunai,
        veiksmas: "prideti",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.duomenuBaze.duomenuKeitimas.value.unshift(
          this.gyvunaiService.getFormosDuomenis()
        );
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "snackbar-success",
          "Sėkmingai pridėjote gyvūną",
          "bottom",
          "center"
        );
      }
    });
  }
  redaguotiDuomenis(eilute) {
    this.id = eilute.id_gyvunas;
    const dialogRef = this.dialog.open(PerziuretiComponent, {
      data: {
        gyvunas: eilute,
        veiksmas: "redaguoti",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.duomenuBaze.duomenuKeitimas.value.findIndex(
          (x) => x.id_gyvunas === this.id
        );
        // Then you update that record using data from formosDuomenys (values you entered)
        this.duomenuBaze.duomenuKeitimas.value[foundIndex] =
          this.gyvunaiService.getFormosDuomenis();
        // And lastly refresh table
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "black",
          "Sėkmingai pakoregavote gyvūno duomenis",
          "bottom",
          "center"
        );
      } else if (result === 2) {
        const foundIndex = this.duomenuBaze.duomenuKeitimas.value.findIndex(
          (x) => x.id_gyvunas === this.id
        );
        this.duomenuBaze.duomenuKeitimas.value.splice(foundIndex, 1);
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "snackbar-danger",
          "Sėkmingai ištrynėte gyvūną",
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
    this.duomenuBaze = new GyvunaiService(this.httpClient);
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

export class DuomenuSaltinis extends DataSource<Gyvunai> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  paieskosDuomenys: Gyvunai[] = [];
  uzkrautiDuomenys: Gyvunai[] = [];
  constructor(
    public duomenuBaze: GyvunaiService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Gyvunai[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.duomenuBaze.duomenuKeitimas,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.duomenuBaze.getGyvunus();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.paieskosDuomenys = this.duomenuBaze.duomenys
          .slice()
          .filter((gyvunas: Gyvunai) => {
            const paieskosTekstas = (
              gyvunas.cipas +
              gyvunas.lytis +
              gyvunas.veisle +
              gyvunas.gimimometai +
              gyvunas.rusis +
              gyvunas.vardas
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
  sortData(duomenys: Gyvunai[]): Gyvunai[] {
    if (!this._sort.active || this._sort.direction === "") {
      return duomenys;
    }
    return duomenys.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "cipas":
          [propertyA, propertyB] = [a.cipas, b.cipas];
          break;
        case "lytis":
          [propertyA, propertyB] = [a.lytis, b.lytis];
          break;
        case "veisle":
          [propertyA, propertyB] = [a.veisle, b.veisle];
          break;
        case "gimimometai":
          [propertyA, propertyB] = [a.gimimometai, b.gimimometai];
          break;
        case "rusis":
          [propertyA, propertyB] = [a.rusis, b.rusis];
          break;
        case "vardas":
          [propertyA, propertyB] = [a.vardas, b.vardas];
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
