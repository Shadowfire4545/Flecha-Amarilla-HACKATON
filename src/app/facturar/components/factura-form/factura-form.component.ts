import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface InvoiceType {
  name: string;
  code: string;
}

@Component({
  selector: 'factura-form',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule
  ],
  templateUrl: './factura-form.component.html',
})
export class FacturaFormComponent { 
  rfc: string = '';
  token: string = '';
  dropdownOpen = false;
  selectedInvoiceType: InvoiceType = {} as InvoiceType;
  @Output() nextStep = new EventEmitter<void>();
  
  invoiceTypes = [
    { name: 'Facturación de boletos', code: 'BOL' },
    { name: 'Facturación de envíos Primera Plus', code: 'ENV' },
    { name: 'Facturación de consumo de alimentos', code: 'ALI' }
  ];
  
  selectedInvoiceTypeValidation(): boolean {
    return !!this.selectedInvoiceType?.name;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  
  selectInvoiceType(type: any) {
    this.selectedInvoiceType = type;
    this.dropdownOpen = false;
  }
  
  avanzar() {
    this.nextStep.emit(); 
  }

}
