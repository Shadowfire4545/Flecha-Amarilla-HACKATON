import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StepService } from "../data-access/step.service";
import { UserService } from "../data-access/user.service";
import { ToastService } from "../../../shared/data-access/toast.service";
import { HttpHeaders } from "@angular/common/http";
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'folio-form',
    imports:[
        CommonModule,
        FormsModule,
        MatProgressSpinner
    ],
    templateUrl: "./folio-form.component.html",
})
export class FolioFormComponent {
    stepService = inject(StepService);
    userService = inject(UserService);
    toastService = inject(ToastService)

    user = this.userService.user;

    folio: string = '';
    loadingFolio = signal(false);


    async avanzar() {
        const headers = new HttpHeaders({
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json'
          });
        this.loadingFolio.set(true);
        this.userService.getFolio(this.folio, headers).subscribe(res => {
            if(res.success) {
                if (res.data.id_factura) {
                    this.userService.folio.set(res.data.id_factura);
                    this.stepService.setStep(5)
                } else {
                    this.userService.service.set(res.data.id_servicio);
                    this.userService.folio.set(this.folio);
                    this.stepService.setStep(2);
                    
                }
            } else
                this.toastService.error("Error al obtener folio", res.message);
            this.loadingFolio.set(false);
        })
    }
}