import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PerfectScrollbarDirective } from "ngx-perfect-scrollbar";

import { Zinute } from "../zinute.model";
import { ZinuteService } from "../zinute.service";
import { WebSocketService } from "../../web-socket.service";

@Component({
  selector: "app-koncultacija",
  templateUrl: "./koncultacija.component.html",
  styleUrls: ["./koncultacija.component.sass"],
  providers: [WebSocketService], //io
})
export class KoncultacijaComponent implements OnInit {
  dalyviai: Zinute[];
  pasirinktasDalyvis: Zinute;
  dalyvioZinutes: Zinute[];
  zinutestekstas: string = "";
  hideRequiredControl = new FormControl(false);

  @ViewChild("scrollMe") private zinuciuScrolinimasRef: ElementRef;
  @ViewChild("scrollMe", { read: PerfectScrollbarDirective })
  zinuciuScrolinimas: PerfectScrollbarDirective;
  constructor(
    //public httpClient: HttpClient,
    public zinuteService: ZinuteService,
    public webSocketService: WebSocketService
  ) {
    this.zinuteService
      .getPokalbiuSarasaSpecialisto()
      .subscribe((rezultatai) => {
        this.dalyviai = rezultatai;
        if (this.dalyviai.length > 0) {
          this.pasirinktasDalyvis = this.dalyviai[0];
          this.zinuteService
            .getDalyvioZinutes(this.pasirinktasDalyvis.id_vizitas)
            .subscribe((rezultatai) => {
              this.dalyvioZinutes = rezultatai;
              this.webSocketService.prisijungtiPriePokalbio(
                this.pasirinktasDalyvis
              );
            });
        }
      });
  }

  ngOnInit(): void {
    this.webSocketService.naujaZinuteGauta().subscribe((rezultatai) => {
      this.dalyvioZinutes.push(rezultatai);
    });
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.zinuciuScrolinimasRef.nativeElement.scrollTop =
        this.zinuciuScrolinimasRef.nativeElement.scrollHeight;
    } catch (err) {}
  }

  pasirinktiDalyvi(dalyvis: Zinute) {
    this.pasirinktasDalyvis = dalyvis;
    this.zinuteService
      .getDalyvioZinutes(this.pasirinktasDalyvis.id_vizitas)
      .subscribe((rezultatai) => {
        this.dalyvioZinutes = rezultatai;
        this.webSocketService.prisijungtiPriePokalbio(this.pasirinktasDalyvis);
        this.zinuciuScrolinimas.update();
      });
  }
  issiustiZinute() {
    if (this.zinutestekstas) {
      const zinutesObjektas = {
        fk_vizitas: this.pasirinktasDalyvis.id_vizitas,
        fk_gavejas: this.pasirinktasDalyvis.fk_seimininkas,
        fk_siuntejas: this.pasirinktasDalyvis.fk_specialistas,
        zinute: this.zinutestekstas,
      };
      this.zinutestekstas = "";
      this.zinuteService
        .issiustiZinuteSeimininkui(zinutesObjektas)
        .subscribe((rezultatai: Zinute) => {
          //this.dalyvioZinutes.push(rezultatai);
          this.webSocketService.issiustiZinute(rezultatai); // io
        });
    }
  }
}
