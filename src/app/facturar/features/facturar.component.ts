import { Component, effect, inject, signal } from '@angular/core';
import { FacturaFormComponent } from '../components/factura-form/factura-form.component';
import { DatosFiscalesFormComponent } from '../components/datos-fiscales-form/datos-fiscales-form.component';
import { ConfirmarDatosComponent } from '../components/confirmar-datos/confirmar-datos.component';
import { PaginationService } from '../data-access/pagination.service';

@Component({
  selector: 'app-home',
  imports: [FacturaFormComponent, DatosFiscalesFormComponent, ConfirmarDatosComponent],
  templateUrl: './facturar.component.html',
})
export default class FacturaComponent { 
  paginationService = inject(PaginationService);

  page = this.paginationService.page;

  constructor() {
    effect(() => {
      console.log('Current page:', this.page());
    })
  }
}
