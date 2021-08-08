import { Injectable, ɵisObservable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Vizitas } from "./vizitas.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable()
export class VizitasService {
  private readonly API_NUORODA = `${environment.apiUrl}/vizitas`;
  arLenteleKraunasi = true;
  gautiDuomenys: Vizitas[];
  //duomenuKeitimas: BehaviorSubject<Vizitas[]> = new BehaviorSubject<Vizitas[]>([]);
  // Temporarily stores data from dialogs
  formosDuomenys: any;
  constructor(private httpClient: HttpClient) {}
  get duomenys(): Vizitas[] {
    return this.gautiDuomenys;
  }
  getFormosDuomenis() {
    return this.formosDuomenys;
  }
  /** CRUD METHODS */
  getVizitus(): Observable<Vizitas[]> {
    return this.httpClient.get<Vizitas[]>(this.API_NUORODA + "/vartotojo").pipe(
      map(
        (duomenys) => {
          this.arLenteleKraunasi = false;
          this.gautiDuomenys = duomenys["vizitas"];
          return this.gautiDuomenys;
        },
        (error: HttpErrorResponse) => {
          this.arLenteleKraunasi = false;
          console.log(error.name + " " + error.message);
        }
      )
    );
  }
  getVykdomuVizituSkaiciu(): Observable<any> {
    return this.httpClient.get<any>(this.API_NUORODA + "/vykdomi-vizitai").pipe(
      map(
        (duomenys) => {
          return duomenys["vizitas"];
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      )
    );
  }
  //ctrl k c / ctrl k u
  addVizitas(objektas): void {
    this.httpClient.post(this.API_NUORODA + "/sukurti", objektas).subscribe(
      (data) => {},
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
  atsauktiVizitas(vizitas: number): void {
    this.httpClient
      .patch(this.API_NUORODA + "/atsaukti", { vizitas: vizitas })
      .subscribe(
        (data) => {},
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
  }
}
