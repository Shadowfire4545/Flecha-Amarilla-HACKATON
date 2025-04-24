import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { StepService } from "../data-access/step.service";


@Component({
    selector: "confirmar-datos",
    templateUrl: "./confirmar-datos.component.html",
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule
    ],
})
export class ConfirmarDatosComponent {
    stepService = inject(StepService);
    rfc: string = '';
    nombre: string = '';
    direccion: string = '';

    avanzar() {
        this.stepService.setStep(5);
    }
}