import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Paslauga } from "./paslauga.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable()
export class PaslaugaService {
  private readonly API_NUORODA = `${environment.apiUrl}/paslauga`;
  arLenteleKraunasi = true;
  duomenuKeitimas: BehaviorSubject<Paslauga[]> = new BehaviorSubject<
    Paslauga[]
  >([]);
  // Temporarily stores data from dialogs
  formosDuomenys: any;
  constructor(private httpClient: HttpClient) {}
  get duomenys(): Paslauga[] {
    return this.duomenuKeitimas.value;
  }
  getFormosDuomenis() {
    return this.formosDuomenys;
  }
  /** CRUD METHODS */
  getPaslaugas(): void {
    this.httpClient.get<Paslauga[]>(this.API_NUORODA + "/").subscribe(
      (duomenys) => {
        this.arLenteleKraunasi = false;
        this.duomenuKeitimas.next(duomenys["paslauga"]);
      },
      (klaida: HttpErrorResponse) => {
        this.arLenteleKraunasi = false;
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
  addPaslauga(paslauga: Paslauga): void {
    this.httpClient.post(this.API_NUORODA + "/", paslauga).subscribe(
      (duomenys) => {
        this.formosDuomenys = paslauga;
        this.formosDuomenys.id_paslauga = duomenys["id_paslauga"]; // gal nereikia cia..
      },
      (klaida: HttpErrorResponse) => {
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
  updatePaslauga(paslauga: Paslauga): void {
    this.httpClient.put(this.API_NUORODA + "/", paslauga).subscribe(
      (duomenys) => {
        this.formosDuomenys = paslauga;
      },
      (klaida: HttpErrorResponse) => {
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
  deletePaslauga(id: number): void {
    this.httpClient.delete(this.API_NUORODA + "/" + id).subscribe(
      (duomenys) => {},
      (klaida: HttpErrorResponse) => {
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
}
