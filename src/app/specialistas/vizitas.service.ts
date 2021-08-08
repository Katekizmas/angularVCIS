import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

import { Vizitas } from "./vizitas.model";

@Injectable()
export class VizitasService {
  private readonly API_NUORODA = `${environment.apiUrl}/vizitas`;
  arLenteleKraunasi = true;
  duomenuKeitimas: BehaviorSubject<Vizitas[]> = new BehaviorSubject<Vizitas[]>(
    []
  );
  gautiDuomenys: Vizitas[];
  // Temporarily stores data from dialogs
  formosDuomenys: any;
  constructor(private httpClient: HttpClient) {}
  get duomenys(): Vizitas[] {
    return this.duomenuKeitimas.value;
  }
  getFormosDuomenis() {
    return this.formosDuomenys;
  }
  /** CRUD METHODS */
  gautiNepatvirtintusVizitus(): void {
    this.httpClient
      .get<Vizitas[]>(this.API_NUORODA + "/vizitai-nepatvirtinti")
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
  patvirtintiVizita(vizitas: Vizitas): void {
    this.httpClient
      .patch(this.API_NUORODA + "/patvirtinti-specialistas", vizitas)
      .subscribe(
        (duomenys) => {
          //this.formosDuomenys = vizitas;
        },
        (klaida: HttpErrorResponse) => {
          console.log(klaida.name + " " + klaida.message);
        }
      );
  }
  atsauktiVizita(vizitas: Vizitas): void {
    this.httpClient
      .patch(this.API_NUORODA + "/atsaukti-specialistas", vizitas)
      .subscribe(
        (duomenys) => {
          //this.formosDuomenys = vizitas;
        },
        (klaida: HttpErrorResponse) => {
          console.log(klaida.name + " " + klaida.message);
        }
      );
  }
}
