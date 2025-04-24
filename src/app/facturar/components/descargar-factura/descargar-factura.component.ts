import { Component, inject, signal } from "@angular/core";
import { UserService } from "../data-access/user.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpHeaders } from "@angular/common/http";
import { StepService } from "../data-access/step.service";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
    selector: 'descargar-factura',
    imports: [
        CommonModule,
        FormsModule,
        MatProgressSpinner,
    ],
    templateUrl: "./descargar-factura.component.html",
})
export class DescargarFacturaComponent {
    userService = inject(UserService);
    stepService = inject(StepService);
    user = this.userService.user;

    correo: string = '';
    loadingDescarga = signal(false);

    descargarFacturaPDF() {
        const invoiceId = this.userService.folio();
        const headers = new HttpHeaders({
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json'
          });
        if (invoiceId) {
            this.loadingDescarga.set(true);
            this.userService.getPdf(invoiceId, "pdf", headers).subscribe((res) => {
                const blob = res;
                const url = window.URL.createObjectURL(blob);

                let filename = `ticket_${invoiceId}.pdf`;

                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                window.URL.revokeObjectURL(url);

                this.stepService.setStep(1);
            });
            
        } else {
            console.error("Invoice ID is undefined");
        }

        this.loadingDescarga.set(false);
    }

    descargarFacturaXML() {
        const invoiceId = this.userService.folio();
        if (invoiceId) {
            const headers = new HttpHeaders({
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json'
              });
            this.userService.getPdf(invoiceId, "xml", headers).subscribe((res) => {
                const blob = res;
                const url = window.URL.createObjectURL(blob);

                let filename = `ticket_${invoiceId}.xml`;

                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                window.URL.revokeObjectURL(url);
                this.stepService.setStep(1);
            });
        } else {
            console.error("Invoice ID is undefined", this.userService.folio(), invoiceId);
        }
    }

    enviarCorreo() {
        this.userService.email.set(this.correo); 
        const invoiceId = this.userService.folio(); 
        const headers = new HttpHeaders({
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json'
          });
        if (this.correo) {
            this.userService.sendMail(this.correo, invoiceId).subscribe((res) => { 
                this.stepService.setStep(1);
            });
        } else {
            console.error("Email is undefined", this.correo);
        }
    }

}