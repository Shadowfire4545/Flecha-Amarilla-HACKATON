import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";

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
    rfc: string = '';
    dropdownRegimen = false;
    dropdownCFDI = false;
    selectedRegimenFiscal: string = '';
    selectedUsoCFDI: string = '';
    @Output() nextStep = new EventEmitter<void>();

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
        this.nextStep.emit(); 
      }
}