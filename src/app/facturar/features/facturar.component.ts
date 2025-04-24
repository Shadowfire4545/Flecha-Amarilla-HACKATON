import { Component, inject, signal } from '@angular/core';
import { FacturaFormComponent } from '../components/factura-form/factura-form.component';
import { DatosFiscalesFormComponent } from '../components/datos-fiscales-form/datos-fiscales-form.component';
import { ConfirmarDatosComponent } from '../components/confirmar-datos/confirmar-datos.component';
import { StepService } from '../components/data-access/step.service';
import { FolioFormComponent } from '../components/folio-form/folio-form.component';
import { DescargarFacturaComponent } from '../components/descargar-factura/descargar-factura.component';
import { NavbarComponent } from "../../shared/ui/navbar/navbar.component";

@Component({
  selector: 'app-home',
  imports: [DatosFiscalesFormComponent, ConfirmarDatosComponent, FolioFormComponent, FacturaFormComponent, DescargarFacturaComponent, NavbarComponent],
  templateUrl: './facturar.component.html',
})
export default class FacturaComponent { 
  stepService = inject(StepService);
  step = this.stepService.step;
}