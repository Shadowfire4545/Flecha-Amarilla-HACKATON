import { Component, signal } from '@angular/core';
import { FacturaFormComponent } from '../components/factura-form/factura-form.component';
import { DatosFiscalesFormComponent } from '../components/datos-fiscales-form/datos-fiscales-form.component';
import { ConfirmarDatosComponent } from '../components/confirmar-datos/confirmar-datos.component';

@Component({
  selector: 'app-home',
  imports: [FacturaFormComponent, DatosFiscalesFormComponent, ConfirmarDatosComponent],
  templateUrl: './facturar.component.html',
})
export default class FacturaComponent { 
  step = signal(1);
}
