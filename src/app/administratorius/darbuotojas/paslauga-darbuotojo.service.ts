import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { PaslaugaDarbuotojo } from "./paslauga-darbuotojo.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable()
export class PaslaugaDarbuotojoService {
  private readonly API_NUORODA = `${environment.apiUrl}/paslauga`;
  arLenteleKraunasi = true;
  gautiDuomenys: PaslaugaDarbuotojo[];
  // Temporarily stores data from dialogs
  formosDuomenys: any;
  constructor(private httpClient: HttpClient) {}
  get duomenys(): PaslaugaDarbuotojo[] {
    return this.gautiDuomenys;
  }
  getFormosDuomenis() {
    return this.formosDuomenys;
  }
  /** CRUD METHODS */
  getDarbuotojoPaslaugas(id_specialistas): Observable<PaslaugaDarbuotojo[]> {
    return this.httpClient
      .get<PaslaugaDarbuotojo[]>(
        this.API_NUORODA + "/darbuotojo/" + id_specialistas
      )
      .pipe(
        map(
          (duomenys) => {
            this.arLenteleKraunasi = false;
            this.gautiDuomenys = duomenys["paslauga"];
            return this.gautiDuomenys;
          },
          (error: HttpErrorResponse) => {
            this.arLenteleKraunasi = false;
            console.log(error.name + " " + error.message);
          }
        )
      );
  }
  addDarbuotojoPaslaugas(
    paslauga: PaslaugaDarbuotojo[],
    id_specialistas
  ): void {
    this.httpClient
      .post(
        this.API_NUORODA + "/darbuotojo/prideti/" + id_specialistas,
        paslauga
      )
      .subscribe(
        (duomenys) => {},
        (klaida: HttpErrorResponse) => {
          console.log(klaida.name + " " + klaida.message);
        }
      );
  }
  deleteDarbuotojoPaslaugas(
    paslauga: PaslaugaDarbuotojo[],
    id_specialistas
  ): void {
    this.httpClient
      .post(
        this.API_NUORODA + "/darbuotojo/istrinti/" + id_specialistas,
        paslauga
      )
      .subscribe(
        (duomenys) => {},
        (klaida: HttpErrorResponse) => {
          console.log(klaida.name + " " + klaida.message);
        }
      );
  }
}
