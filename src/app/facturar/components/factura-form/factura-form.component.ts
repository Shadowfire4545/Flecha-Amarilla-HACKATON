import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { PaginationService } from '../../data-access/pagination.service';
import { UserService } from '../../data-access/user.service';
import { HttpHeaders } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
  paginationService = inject(PaginationService);
  userService = inject(UserService);

  loadingUser = signal(false);
  rfc = signal('');
  csfFile = signal<File | null>(null);
  fileError = false;

  faChevronRight = faChevronRight;

  constructor() {
    effect(() => {
      this.rfc.set(this.rfc().toUpperCase())
    })
  }

  invoiceTypes = [
    { name: 'Facturación de boletos', code: 'BOL' },
    { name: 'Facturación de envíos Primera Plus', code: 'ENV' },
    { name: 'Facturación de consumo de alimentos', code: 'ALI' }
  ];


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
        this.paginationService.nextPage();
      } else {
        this.userService.user.set(res.data);
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
