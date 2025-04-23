import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";


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
    rfc: string = '';
    nombre: string = '';
    direccion: string = '';
    @Output() nextStep = new EventEmitter<void>();

    avanzar() {
        this.nextStep.emit(); 
    }
}