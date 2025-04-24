import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { StepService } from "../data-access/step.service";
import { UserService } from "../data-access/user.service";
import { Constants } from "../../../shared/utils/constants";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { HttpHeaders } from "@angular/common/http";


@Component({
    selector: "confirmar-datos",
    templateUrl: "./confirmar-datos.component.html",
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        MatProgressSpinner
    ],
})
export class ConfirmarDatosComponent {
    userService = inject(UserService);
    stepService = inject(StepService);
    tipoServicios = Constants.tipoServicios;
    rfc: string = this.userService.rfcToFetch();
    razonSocial: string = this.userService.companyName();
    regimen: string = this.userService.taxRegimLabel();
    usoCFDI: string = this.userService.cfdi();
    cp: number = this.userService.zip();
    servicio: string = this.tipoServicios.find((s) => s.id === this.userService.service())?.name || '';
    importe: number = 0;
    loadingConfirm = signal(false);

    avanzar() {
        const headers = new HttpHeaders({
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json'
          });

          const user = {
            rfc: this.userService.rfcToFetch(),
            zip: this.userService.zip(),
            taxregime: this.userService.taxRegim(),
            companyname: this.userService.companyName(),
            email: "",
          }
        this.loadingConfirm.set(true);
        console.log("user", user);
        this.userService.saveUser(user, headers).subscribe(res => {
            console.log("res", user);
            if (res.success) {
                this.userService.user.set(res.data);
                this.userService.rfcToFetch.set(this.userService.rfcToFetch());
                this.userService.companyName.set(this.userService.companyName());
                this.userService.zip.set(this.userService.zip());
                this.userService.taxRegimLabel.set(this.userService.taxRegimLabel());
                this.userService.cfdiLabel.set(this.userService.cfdiLabel());
                this.userService.service.set(this.userService.service());

                this.userService.createInvoice(this.userService.rfcToFetch(), this.userService.cfdi(), this.userService.folio())
                .subscribe(invoice => {
                    this.userService.folio.set(invoice.data.id_factura)
                    this.stepService.setStep(5);
                    this.loadingConfirm.set(false);
                });
            } else {
                console.error("Error al guardar los datos del usuario", res.message);
            }
        });
    }
}