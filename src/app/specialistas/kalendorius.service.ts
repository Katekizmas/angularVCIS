import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

import { Kalendorius } from "./kalendorius.model";

@Injectable()
export class KalendoriusService {
  arLenteleKraunasi = true;
  private readonly API_NUORODA = `${environment.apiUrl}/vizitas`;
  duomenuKeitimas: BehaviorSubject<Kalendorius[]> = new BehaviorSubject<
    Kalendorius[]
  >([]);
  gautiDuomenys: Kalendorius[];
  // Temporarily stores data from dialogs
  formosDuomenys: any;
  constructor(private httpClient: HttpClient) {}
  get duomenys(): Kalendorius[] {
    return this.duomenuKeitimas.value;
  }
  getFormosDuomenis() {
    return this.formosDuomenys;
  }
  getPatvirtintusVizitus() /*: Observable<Kalendorius[]> */ {
    return this.httpClient
      .get<Kalendorius[]>(this.API_NUORODA + "/vizitai-patvirtinti")
      .pipe(
        map(
          (duomenys) => {
            this.arLenteleKraunasi = false;
            this.gautiDuomenys = duomenys["vizitas"];
            this.duomenuKeitimas.next(duomenys["vizitas"]);
            return this.gautiDuomenys;
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
        )
      );
  }
  getVizituIstorija() /*: Observable<Kalendorius[]> */ {
    return this.httpClient
      .get<Kalendorius[]>(this.API_NUORODA + "/vizitai-patvirtinti")
      .subscribe(
        (duomenys) => {
          this.arLenteleKraunasi = false;
          this.duomenuKeitimas.next(duomenys["vizitas"]);
        },
        (klaida: HttpErrorResponse) => {
          this.arLenteleKraunasi = false;
          console.log(klaida.name + " " + klaida.message);
        }
      );
  }
  ivykdytiVizitaIstorija(kalendorius: any): void {
    this.httpClient
      .post(this.API_NUORODA + "/ivykdyti-specialistas-istorija", kalendorius)
      .subscribe(
        (duomenys) => {
          //this.formosDuomenys = duomenys;
        },
        (klaida: HttpErrorResponse) => {
          console.log(klaida.name + " " + klaida.message);
        }
      );
  }
  ivykdytiVizitaSkiepas(kalendorius: any): void {
    this.httpClient
      .post(this.API_NUORODA + "/ivykdyti-specialistas-skiepas", kalendorius)
      .subscribe(
        (duomenys) => {
          //this.formosDuomenys = duomenys;
        },
        (klaida: HttpErrorResponse) => {
          console.log(klaida.name + " " + klaida.message);
        }
      );
  }
}
