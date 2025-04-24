import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { UserService } from "../data-access/user.service";
import { StepService } from "../data-access/step.service";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

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
        InputTextModule,
        MatProgressSpinner,
    ],
})
export class DatosFiscalesFormComponent {
    userService = inject(UserService);
    stepService = inject(StepService);
    user = this.userService.user;
    rfc: string = this.userService.rfcToFetch();
    cp: string = this.userService.zip().toString();
    razonSocial: string = this.userService.companyName();
    selectedRegimenFiscal: string = '';
    selectedUsoCFDI: string = '';
    selectCFDI: string = this.userService.cfdiLabel();
    selectRegimen: string = this.userService.taxRegimLabel();
    loadingDatos = signal(false);

    dropdownRegimen = false;
    dropdownCFDI = false;

    regimenFiscal = [
      { label: "601 - General de Ley Personas Morales", value: "601" },
      { label: "603 - Personas Morales con Fines no Lucrativos", value: "603" },
      { label: "605 - Sueldos y Salarios e Ingresos Asimilados a Salarios", value: "605" },
      { label: "606 - Arrendamiento", value: "606" },
      { label: "607 - Régimen de Enajenación o Adquisición de Bienes", value: "607" },
      { label: "608 - Demás ingresos", value: "608" },
      { label: "610 - Residentes en el Extranjero sin Establecimiento Permanente en México", value: "610" },
      { label: "611 - Ingresos por Dividendos (socios y accionistas)", value: "611" },
      { label: "612 - Personas Físicas con Actividades Empresariales y Profesionales", value: "612" },
      { label: "614 - Ingresos por intereses", value: "614" },
      { label: "615 - Régimen de los ingresos por obtención de premios", value: "615" },
      { label: "616 - Sin obligaciones fiscales", value: "616" },
      { label: "620 - Sociedades Cooperativas de Producción que optan por diferir sus ingresos", value: "620" },
      { label: "621 - Incorporación Fiscal", value: "621" },
      { label: "622 - Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras", value: "622" },
      { label: "623 - Opcional para Grupos de Sociedades", value: "623" },
      { label: "624 - Coordinados", value: "624" },
      { label: "625 - Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas", value: "625" },
      { label: "626 - Régimen Simplificado de Confianza", value: "626" }
    ];    

    usoCFDI = [
      { label: "G01 - Adquisición de mercancías", value: "G01" },
      { label: "G02 - Devoluciones, descuentos o bonificaciones", value: "G02" },
      { label: "G03 - Gastos en general", value: "G03" },
      { label: "I01 - Construcciones", value: "I01" },
      { label: "I02 - Mobilario y equipo de oficina por inversiones", value: "I02" },
      { label: "I03 - Equipo de transporte", value: "I03" },
      { label: "I04 - Equipo de computo y accesorios", value: "I04" },
      { label: "I05 - Dados, troqueles, moldes, matrices y herramental", value: "I05" },
      { label: "I06 - Comunicaciones telefónicas", value: "I06" },
      { label: "I07 - Comunicaciones satelitales", value: "I07" },
      { label: "I08 - Otra maquinaria y equipo", value: "I08" },
      { label: "D01 - Honorarios médicos, dentales y gastos hospitalarios", value: "D01" },
      { label: "D02 - Gastos médicos por incapacidad o discapacidad", value: "D02" },
      { label: "D03 - Gastos funerales", value: "D03" },
      { label: "D04 - Donativos", value: "D04" },
      { label: "D05 - Intereses reales efectivamente pagados por créditos hipotecarios", value: "D05" },
      { label: "D06 - Aportaciones voluntarias al SAR", value: "D06" },
      { label: "D07 - Primas por seguros de gastos médicos", value: "D07" },
      { label: "D08 - Gastos de transportación escolar obligatoria", value: "D08" },
      { label: "D09 - Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones", value: "D09" },
      { label: "D10 - Pagos por servicios educativos (colegiaturas)", value: "D10" },
      { label: "P01 - Por definir", value: "P01" }
    ];

      toggleDropdownRegimen() {
        this.dropdownRegimen = !this.dropdownRegimen;
        this.dropdownCFDI = false;
      }

      toggleDropdownCFDI() {
        this.dropdownCFDI = !this.dropdownCFDI;
        this.dropdownRegimen = false;
      }
      
      selectRegimenFiscal(type: any) {
        this.selectedRegimenFiscal = type.value;
        this.selectRegimen = type.label;
        this.dropdownRegimen = false;
      }

      selectUsoCFDI(type: any) {
        this.selectedUsoCFDI = type.value;
        this.selectCFDI = type.label;
        this.dropdownCFDI = false;
      }

      avanzar() {
        this.loadingDatos.set(true);
        if(this.selectedUsoCFDI != "" && this.selectedRegimenFiscal != "" ) {
          this.userService.cfdi.set(this.selectedUsoCFDI)
          this.userService.taxRegim.set(this.selectedRegimenFiscal)
          this.userService.taxRegimLabel.set(this.selectRegimen)
          this.userService.cfdiLabel.set(this.selectCFDI)
          this.userService.companyName.set(this.razonSocial)
          this.userService.zip.set(parseInt(this.cp))
          this.stepService.setStep(4);
          this.loadingDatos.set(false);
        }
      }
}