import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_NUORODA = `${environment.apiUrl}/autentifikacija`;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(new User());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  checkCookie() {
    return this.httpClient.get<any>(this.API_NUORODA + "/refresh").pipe(
      map((vartotojas) => {
        this.currentUserSubject.next(vartotojas);
        return vartotojas;
      })
    );
  }
  login(pastas: string, slaptazodis: string) {
    return this.httpClient
      .post<any>(this.API_NUORODA + "/prisijungti", {
        pastas,
        slaptazodis,
      })
      .pipe(
        map((vartotojas) => {
          this.currentUserSubject.next(vartotojas);
          return vartotojas;
        })
      );
  }

  logout() {
    this.httpClient
      .post(this.API_NUORODA + "/atsijungti", null)
      .subscribe((duomenys) => {
        this.currentUserSubject.next(null);
        return of({ success: false });
      });
    return of({ success: false });
  }
}
