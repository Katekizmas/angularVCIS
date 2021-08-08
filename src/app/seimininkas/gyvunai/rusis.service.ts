import { Injectable, ɵisObservable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Rusis } from "./rusis.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
@Injectable()
export class RusisService {
  private readonly API_NUORODA = `${environment.apiUrl}/rusis`;
  arLenteleKraunasi = true;
  gautiDuomenys: Rusis[];
  // Temporarily stores data from dialogs
  formosDuomenys: any;
  constructor(private httpClient: HttpClient) {}
  get duomenys(): Rusis[] {
    return this.gautiDuomenys;
  }
  getFormosDuomenis() {
    return this.formosDuomenys;
  }
  /** CRUD METHODS */
  getRusis(): Observable<Rusis[]> {
    return this.httpClient.get<Rusis[]>(this.API_NUORODA + "/").pipe(
      map(
        (duomenys) => {
          this.arLenteleKraunasi = false;
          //this.rusis.next(duomenys["rusis"]);
          this.gautiDuomenys = duomenys["rusis"];
          return this.gautiDuomenys;
        },
        (error: HttpErrorResponse) => {
          this.arLenteleKraunasi = false;
          console.log(error.name + " " + error.message);
        }
      )
    );
  }
}
