import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Specialistas } from "./specialistas.model";
import { PaslaugaDarbuotojo } from "./paslauga-darbuotojo.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

import { PaslaugaDarbuotojoService } from "./paslauga-darbuotojo.service";

@Injectable()
export class SpecialistasService {
  private readonly API_NUORODA = `${environment.apiUrl}/specialistas`;
  arLenteleKraunasi = true;
  duomenuKeitimas: BehaviorSubject<Specialistas[]> = new BehaviorSubject<
    Specialistas[]
  >([]);
  gautiDuomenys: Specialistas[];
  // Temporarily stores data from dialogs
  formosDuomenys: any;
  constructor(
    private httpClient: HttpClient,
    public paslaugaDarbuotojoService: PaslaugaDarbuotojoService
  ) {}
  get duomenys(): Specialistas[] {
    return this.duomenuKeitimas.value;
  }
  getFormosDuomenis() {
    return this.formosDuomenys;
  }
  /** CRUD METHODS */
  getSpecialistus(): void {
    this.httpClient.get<Specialistas[]>(this.API_NUORODA + "/").subscribe(
      (duomenys) => {
        this.arLenteleKraunasi = false;
        this.duomenuKeitimas.next(duomenys["specialistas"]);
      },
      (klaida: HttpErrorResponse) => {
        this.arLenteleKraunasi = false;
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
  getNedirbanciusSeimininkus(): Observable<Specialistas[]> {
    return this.httpClient
      .get<Specialistas[]>(this.API_NUORODA + "/nedirbantys")
      .pipe(
        map(
          (duomenys) => {
            this.arLenteleKraunasi = false;
            this.gautiDuomenys = duomenys["specialistas"];
            return this.gautiDuomenys;
          },
          (error: HttpErrorResponse) => {
            this.arLenteleKraunasi = false;
            console.log(error.name + " " + error.message);
          }
        )
      );
  }
  addSpecialista(
    specialistas: Specialistas,
    paslauga: PaslaugaDarbuotojo[]
  ): void {
    this.httpClient.post(this.API_NUORODA + "/prideti", specialistas).subscribe(
      (duomenys) => {
        this.formosDuomenys = specialistas;
        this.formosDuomenys.id_specialistas = duomenys["id_specialistas"]; // gal nereikia cia..
        this.paslaugaDarbuotojoService.addDarbuotojoPaslaugas(
          paslauga,
          duomenys["id_specialistas"]
        );
      },
      (klaida: HttpErrorResponse) => {
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
  updateSpecialista(specialistas: Specialistas): void {
    this.httpClient.put(this.API_NUORODA + "/", specialistas).subscribe(
      (duomenys) => {
        this.formosDuomenys = specialistas;
      },
      (klaida: HttpErrorResponse) => {
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
  deleteSpecialista(id: number): void {
    this.httpClient.delete(this.API_NUORODA + "/" + id).subscribe(
      (duomenys) => {},
      (klaida: HttpErrorResponse) => {
        console.log(klaida.name + " " + klaida.message);
      }
    );
  }
}
