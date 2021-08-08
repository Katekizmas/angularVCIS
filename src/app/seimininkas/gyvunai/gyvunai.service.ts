import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Gyvunai } from "./gyvunai.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable()
export class GyvunaiService {
  private readonly API_NUORODA = `${environment.apiUrl}/gyvunas`;
  arLenteleKraunasi = true;
  duomenuKeitimas: BehaviorSubject<Gyvunai[]> = new BehaviorSubject<Gyvunai[]>(
    []
  );
  // Temporarily stores data from dialogs
  formosDuomenys: any;
  constructor(private httpClient: HttpClient) {}
  get duomenys(): Gyvunai[] {
    return this.duomenuKeitimas.value;
  }
  getFormosDuomenis() {
    return this.formosDuomenys;
  }
  /** CRUD METHODS */
  getGyvunus(): void {
    this.httpClient.get<Gyvunai[]>(this.API_NUORODA + "/vartotojo").subscribe(
      (duomenys) => {
        this.arLenteleKraunasi = false;
        this.duomenuKeitimas.next(duomenys["gyvunas"]);
      },
      (klaida: HttpErrorResponse) => {
        this.arLenteleKraunasi = false;
      }
    );
  }
  getGyvunusObservable(): Observable<Gyvunai[]> {
    return this.httpClient.get<Gyvunai[]>(this.API_NUORODA + "/vartotojo").pipe(
      map(
        (duomenys) => {
          return duomenys["gyvunas"];
        },
        (klaida: HttpErrorResponse) => {
          console.log(klaida.name + " " + klaida.message);
        }
      )
    );
  }
  addGyvunas(gyvunas: Gyvunai): void {
    this.httpClient.post(this.API_NUORODA + "/", gyvunas).subscribe(
      (duomenys) => {
        this.formosDuomenys = gyvunas;
        this.formosDuomenys.id_gyvunas = duomenys["id_gyvunas"]; // gal nereikia cia..
      },
      (klaida: HttpErrorResponse) => {
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
  updateGyvunas(gyvunas: Gyvunai): void {
    this.httpClient.put(this.API_NUORODA + "/", gyvunas).subscribe(
      (duomenys) => {
        this.formosDuomenys = gyvunas;
      },
      (klaida: HttpErrorResponse) => {
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
  deleteGyvunas(id: number): void {
    this.httpClient.delete(this.API_NUORODA + "/" + id).subscribe(
      (duomenys) => {},
      (klaida: HttpErrorResponse) => {
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
}
