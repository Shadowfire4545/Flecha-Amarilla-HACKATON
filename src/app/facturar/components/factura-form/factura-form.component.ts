import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { StepService } from '../data-access/step.service';
import { HttpHeaders } from '@angular/common/http';
import { DividerModule } from 'primeng/divider';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../data-access/user.service';

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
    ButtonModule,
    DividerModule,
    MatProgressSpinner,
    FaIconComponent,
  ],
  templateUrl: './factura-form.component.html',
})
export class FacturaFormComponent { 
  stepService = inject(StepService);
  token: string = '';
  dropdownOpen = false;
  selectedInvoiceType: InvoiceType = {} as InvoiceType;
  

  userService = inject(UserService);

  loadingUser = signal(false);
  rfc = signal('');
  loadingFile = signal(false);
  csfFile = signal<File | null>(null);
  fileError = false;

  faChevronRight = faChevronRight;

  constructor() {
    effect(() => {
      this.rfc.set(this.rfc().toUpperCase())
    })
    effect(async () => {
      if (this.csfFile()) {
        this.loadingFile.set(true);
        this.userService.getFileData(this.csfFile()!).subscribe((res) => {
          if (res.success) {
            this.userService.getUser(this.rfc()).subscribe((res) => {
              if (!res.success && res.data === null) {
                this.stepService.setStep(3);
            } else {
              this.userService.user.set(res.data);
              this.userService.companyName.set(res.data.companyname)
              this.userService.taxRegim.set(res.data.taxregime)
              this.userService.zip.set(res.data.zip)
              this.userService.email.set(res.data.email)
              this.stepService.setStep(3);
            }
            })
          } else {
            this.fileError = true;
            this.csfFile.set(null);
          }
        })
      }
    })
  }

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
  
  async avanzar() {
    this.userService.rfcToFetch.set(this.rfc());
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    });
    this.loadingUser.set(true);
    this.userService.getUser(this.rfc(), headers).subscribe((res) => {
        this.loadingUser.set(false);
        if (!res.success && res.data === null) {
          this.stepService.setStep(3);
      } else {
        this.userService.user.set(res.data);
        this.userService.companyName.set(res.data.companyname)
        this.userService.taxRegim.set(res.data.taxregime)
        this.userService.zip.set(res.data.zip)
        this.userService.email.set(res.data.email)
        this.stepService.setStep(3);
      }
    })
  }

  updateRfc(event: Event) {
    const input = event.target as HTMLInputElement;
    this.rfc.set(input.value);
  }

  onFileSelect(event: any) {
    const file = event.target?.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        this.csfFile.set(file);
        this.fileError = false;
      } else {
        this.csfFile.set(null);
        this.fileError = true;
        if (event.target) event.target.value = '';
      }
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        this.csfFile.set(file);
        this.fileError = false;
      } else {
        this.csfFile.set(null);
        this.fileError = true;
      }
    }
  }

  clearFile() {
    this.csfFile.set(null);
    this.fileError = false;
  }

  formatFileSize(bytes: number | undefined): string {
    if (!bytes) return '0 KB';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  }
}