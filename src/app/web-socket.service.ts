import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Zinute } from "./specialistas/zinute.model";
import { subscribeOn } from "rxjs/operators";

@Injectable()
export class WebSocketService {
  public socketas = io(environment.apiUrl, { withCredentials: true });
  //socketas: Socket;
  constructor() {
    //this.socketas = io(environment.apiUrl, { withCredentials: true });
  }
  prisijungtiPriePokalbio(data) {
    this.socketas.emit("prisijungti", data);
  }

  vartotojasPrisijunge() {
    return new Observable<{ user: String; message: String }>((observer) => {
      this.socketas.on("prisijunge", (data) => {
        observer.next(data);
      });
      return () => {
        this.socketas.disconnect();
      };
    });
  }

  atsijungtiNuoPokalbio(data) {
    this.socketas.emit("atsijungti", data);
  }

  vartotojasAtsijunge() {
    return new Observable<{ user: String; message: String }>((observer) => {
      this.socketas.on("atsijunge", (data) => {
        observer.next(data);
      });
      return () => {
        this.socketas.disconnect();
      };
    });
  }
  issiustiZinute(duomenys) {
    this.socketas.emit("zinute", duomenys);
  }

  naujaZinuteGauta() {
    return new Observable<Zinute>((observer) => {
      this.socketas.on("nauja zinute", (duomenys) => {
        observer.next(duomenys);
      });
      return () => {
        this.socketas.disconnect;
      };
    });
  }
}
