import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { UserService } from "../data-access/user.service";
import { StepService } from "../data-access/step.service";

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
  }

@Component({
    selector: "datos-fiscales-form",
    templateUrl: "./datos-fiscales-form.component.html",
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule
    ],
})
export class DatosFiscalesFormComponent {
    userService = inject(UserService);
    stepService = inject(StepService);
    user = this.userService.user;
    nombre: string = this.user()?.nombre || '';
    rfc: string = this.user()?.rfc || '';
    direccion: string = this.user()?.direccion || '';
    cp: string = this.user()?.codigoPostal || '';
    razonSocial: string = this.user()?.razonSocial || '';
    selectedRegimenFiscal: string = this.user()?.regimenFiscal || '';
    selectedUsoCFDI: string = this.user()?.usoCFDI || '';

    dropdownRegimen = false;
    dropdownCFDI = false;

    regimenFiscal = ["Persona Fisica", "Persona Moral", "Extranjero"];
    usoCFDI = [ "G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G10", "G11", "G12", "G13", "G14", "G15", "G16", "G17", "G18", "G19", "G20"];
    
      toggleDropdownRegimen() {
        this.dropdownRegimen = !this.dropdownRegimen;
        this.dropdownCFDI = false;
      }

      toggleDropdownCFDI() {
        this.dropdownCFDI = !this.dropdownCFDI;
        this.dropdownRegimen = false;
      }
      
      selectRegimenFiscal(type: any) {
        this.selectedRegimenFiscal = type;
        this.dropdownRegimen = false;
      }

      selectUsoCFDI(type: any) {
        this.selectedUsoCFDI = type;
        this.dropdownCFDI = false;
      }

      avanzar() {
        this.stepService.setStep(4);
      }
}