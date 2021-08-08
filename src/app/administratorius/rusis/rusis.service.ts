import { Injectable } from "@angular/core";
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
  duomenuKeitimas: BehaviorSubject<Rusis[]> = new BehaviorSubject<Rusis[]>([]);
  formosDuomenys: any;
  constructor(private httpClient: HttpClient) {}
  get duomenys(): Rusis[] {
    return this.duomenuKeitimas.value;
  }
  getFormosDuomenis() {
    return this.formosDuomenys;
  }
  getRusis(): void {
    this.httpClient.get<Rusis[]>(this.API_NUORODA + "/").subscribe(
      (duomenys) => {
        this.arLenteleKraunasi = false;
        this.duomenuKeitimas.next(duomenys["rusis"]);
      },
      (klaida: HttpErrorResponse) => {
        this.arLenteleKraunasi = false;
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
  addRusi(rusis: Rusis): void {
    this.httpClient.post(this.API_NUORODA + "/", rusis).subscribe(
      (duomenys) => {
        this.formosDuomenys = rusis;
        this.formosDuomenys.id_rusis = duomenys["id_rusis"];
      },
      (klaida: HttpErrorResponse) => {
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
  updateRusi(rusis: Rusis): void {
    this.httpClient.put(this.API_NUORODA + "/", rusis).subscribe(
      (duomenys) => {
        this.formosDuomenys = rusis;
      },
      (klaida: HttpErrorResponse) => {
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
  deleteRusi(id: number): void {
    this.httpClient.delete(this.API_NUORODA + "/" + id).subscribe(
      (duomenys) => {},
      (klaida: HttpErrorResponse) => {
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
}
