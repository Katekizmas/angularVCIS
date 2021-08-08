import { Injectable, ɵisObservable } from "@angular/core";
import { BehaviorSubject, fromEventPattern, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Paslauga } from './paslauga.model';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

@Injectable()
export class PaslaugaService {
  private readonly API_NUORODA = `${environment.apiUrl}/paslauga`;
  gautiDuomenys: Paslauga[];
  //duomenuKeitimas: BehaviorSubject<Vizitas[]> = new BehaviorSubject<Vizitas[]>([]);
  // Temporarily stores data from dialogs
  constructor(private httpClient: HttpClient) {}
  get duomenys(): Paslauga[] {
    return this.gautiDuomenys;
  }
  /** CRUD METHODS */
  getPaslaugas(): Observable<Paslauga[]> {
    return this.httpClient.get<Paslauga[]>(this.API_NUORODA + "/").pipe(map(
      (duomenys) => {
        this.gautiDuomenys = duomenys["paslauga"];
        return this.gautiDuomenys;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      })
    );
  }
}