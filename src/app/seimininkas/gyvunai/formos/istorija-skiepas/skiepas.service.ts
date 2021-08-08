import { Injectable, ɵisObservable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Skiepas } from "./skiepas.model";
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

@Injectable()
export class SkiepasService {
  private readonly API_NUORODA = `${environment.apiUrl}/skiepas`;
  arLenteleKraunasi = true;
  gautiDuomenys: Skiepas[];
  // Temporarily stores data from dialogs
  formosDuomenys: any;
  constructor(private httpClient: HttpClient) {}
  get duomenys(): Skiepas[] {
    return this.gautiDuomenys;
  }
  getFormosDuomenis() {
    return this.formosDuomenys;
  }
  /** CRUD METHODS */
   getSkiepus(id_gyvunas: number): Observable<Skiepas[]> {
    return this.httpClient.get<Skiepas[]>(this.API_NUORODA + "/gyvunas/" + id_gyvunas).pipe(map(
      (duomenys) => {
        this.arLenteleKraunasi = false;
        this.gautiDuomenys = duomenys["skiepas"];
        return this.gautiDuomenys;
      },
      (error: HttpErrorResponse) => {
        this.arLenteleKraunasi = false;
        console.log(error.name + " " + error.message);
      })
    );
  }
}