import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

import { Zinute } from "./zinute.model";

@Injectable()
export class ZinuteService {
  private readonly API_NUORODA = `${environment.apiUrl}/zinute`;
  gautiDuomenys: Zinute[];
  gautosZinutes: Zinute[];
  issiustosZinutesDuomenys: Zinute;
  constructor(private httpClient: HttpClient) {}
  getPokalbiuSarasaSpecialisto() {
    return this.httpClient
      .get<Zinute[]>(this.API_NUORODA + "/dalyviai-specialisto")
      .pipe(
        map(
          (duomenys) => {
            this.gautiDuomenys = duomenys["dalyviai"];
            return this.gautiDuomenys;
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
        )
      );
  }
  getPokalbiuSarasaSeimininko() {
    return this.httpClient
      .get<Zinute[]>(this.API_NUORODA + "/dalyviai-seimininko")
      .pipe(
        map(
          (duomenys) => {
            this.gautiDuomenys = duomenys["dalyviai"];
            return this.gautiDuomenys;
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
        )
      );
  }
  getDalyvioZinutes(gautasID: number) {
    return this.httpClient
      .get<Zinute[]>(this.API_NUORODA + "/dalyvio-zinutes/" + gautasID)
      .pipe(
        map(
          (duomenys) => {
            this.gautosZinutes = duomenys["zinutes"];
            return this.gautosZinutes;
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
        )
      );
  }
  /*issiustiZinuteSeimininkui(zinute: any): void {
    this.httpClient
      .post(this.API_NUORODA + "/issiusti-zinute-seimininkui", zinute)
      .subscribe(
        (duomenys) => {
          this.issiustosZinutesDuomenys.id_vizitas = duomenys["fk_vizitas"];
          this.issiustosZinutesDuomenys.fk_siuntejas = duomenys["fk_siuntejas"];
          this.issiustosZinutesDuomenys.fk_gavejas = duomenys["fk_gavejas"];
          this.issiustosZinutesDuomenys.zinute = duomenys["zinute"];
          this.issiustosZinutesDuomenys.laikas = duomenys["laikas"];
        },
        (klaida: HttpErrorResponse) => {
          console.log(klaida.name + " " + klaida.message);
        }
      );
  }
  issiustiZinuteSpecialistui(zinute: any): void {
    this.httpClient
      .post(this.API_NUORODA + "/issiusti-zinute-specialistui", zinute)
      .subscribe(
        (duomenys) => {
          this.issiustosZinutesDuomenys.id_vizitas = duomenys["fk_vizitas"];
          this.issiustosZinutesDuomenys.fk_siuntejas = duomenys["fk_siuntejas"];
          this.issiustosZinutesDuomenys.fk_gavejas = duomenys["fk_gavejas"];
          this.issiustosZinutesDuomenys.zinute = duomenys["zinute"];
          this.issiustosZinutesDuomenys.laikas = duomenys["laikas"];
          return {
            id_vizitas: duomenys["fk_vizitas"],
            fk_siuntejas: duomenys["fk_siuntejas"],
            fk_gavejas: duomenys["fk_gavejas"],
            zinute: duomenys["zinute"],
            laikas: duomenys["laikas"],
          };
        },
        (klaida: HttpErrorResponse) => {
          console.log(klaida.name + " " + klaida.message);
        }
      );
  }*/
  issiustiZinuteSeimininkui(zinute: any) {
    return this.httpClient
      .post<Zinute[]>(
        this.API_NUORODA + "/issiusti-zinute-seimininkui",
        zinute,
        zinute
      )
      .pipe(
        map(
          (duomenys) => {
            return {
              id_vizitas: duomenys["zinute"].fk_vizitas,
              fk_siuntejas: duomenys["zinute"].fk_siuntejas,
              fk_gavejas: duomenys["zinute"].fk_gavejas,
              zinute: duomenys["zinute"].zinute,
              laikas: duomenys["zinute"].laikas,
            };
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
        )
      );
  }
  issiustiZinuteSpecialistui(zinute: any) {
    return this.httpClient
      .post<Zinute[]>(
        this.API_NUORODA + "/issiusti-zinute-specialistui",
        zinute
      )
      .pipe(
        map(
          (duomenys) => {
            return {
              id_vizitas: duomenys["zinute"].fk_vizitas,
              fk_siuntejas: duomenys["zinute"].fk_siuntejas,
              fk_gavejas: duomenys["zinute"].fk_gavejas,
              zinute: duomenys["zinute"].zinute,
              laikas: duomenys["zinute"].laikas,
            };
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
        )
      );
  }
}
