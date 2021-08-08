import { Injectable, ɵisObservable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Istorija } from "./istorija.model";
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

@Injectable()
export class IstorijaService {
  private readonly API_NUORODA = `${environment.apiUrl}/istorija`;
  arLenteleKraunasi = true;
  gautiDuomenys: Istorija[];
  // Temporarily stores data from dialogs
  formosDuomenys: any;
  constructor(private httpClient: HttpClient) {}
  get duomenys(): Istorija[] {
    return this.gautiDuomenys;
  }
  getFormosDuomenis() {
    return this.formosDuomenys;
  }
  /** CRUD METHODS */
   getIstorija(id_gyvunas: number): Observable<Istorija[]> {
    return this.httpClient.get<Istorija[]>(this.API_NUORODA + "/gyvunas/" + id_gyvunas).pipe(map(
      (duomenys) => {
        this.arLenteleKraunasi = false;
        this.gautiDuomenys = duomenys["istorija"];
        return this.gautiDuomenys;
      },
      (error: HttpErrorResponse) => {
        this.arLenteleKraunasi = false;
        console.log(error.name + " " + error.message);
      })
    );
  }
}