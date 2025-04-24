import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal, effect, ElementRef, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { StepService } from '../data-access/step.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { DividerModule } from 'primeng/divider';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../data-access/user.service';
import { finalize } from 'rxjs';

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
  // Obtener referencia al elemento input del template
  @ViewChild('csfFileInput') csfFileInputRef!: ElementRef<HTMLInputElement>;

  stepService = inject(StepService);
  userService = inject(UserService);

  token: string = ''; // ¿Se usa este token?
  dropdownOpen = false;
  selectedInvoiceType: InvoiceType = {} as InvoiceType;


  loadingUser = signal(false);
  rfc = signal('');
  loadingFile = signal(false);
  csfFile = signal<File | null>(null);
  fileError = signal(false); 

  faChevronRight = faChevronRight;

  constructor() {
    effect(() => {
      const currentRfc = this.rfc();
      const upperRfc = currentRfc.toUpperCase();
      if (currentRfc !== upperRfc) {
        this.rfc.set(upperRfc);
      }
    });

    effect(() => {
      const currentFile = this.csfFile(); 
      if (currentFile) {
        this.loadingFile.set(true);
        this.fileError.set(false);

        this.userService.getFileData(currentFile)
          .pipe(
            finalize(() => this.loadingFile.set(false))
          )
          .subscribe({
            next: (res) => {
              if (res.success) {
                const headers = new HttpHeaders({
                  'ngrok-skip-browser-warning': 'true',
                  'Content-Type': 'application/json'
                });
                 this.loadingUser.set(true); 
                 this.userService.getUser(res.data.rfc, headers)
                   .pipe(finalize(() => this.loadingUser.set(false))) 
                   .subscribe({
                     next: (userRes) => {
                       if (!userRes.success && userRes.data === null) {
                          this.userService.rfcToFetch.set(res.data.rfc);
                          this.userService.zip.set(res.data.zip);
                          this.userService.companyName.set(res.data.companyname);
                          this.stepService.setStep(3);
                       } else {
                         this.userService.user.set(userRes.data);
                         this.userService.companyName.set(userRes.data.companyname);
                         this.userService.taxRegim.set(userRes.data.taxregime);
                         this.userService.zip.set(userRes.data.zip);
                         this.userService.email.set(userRes.data.email);
                         this.stepService.setStep(3);
                       }
                     },
                   });

              } else {
                console.error('Error en la respuesta de getFileData:', res);
                this.fileError.set(true);
                this.csfFile.set(null);
                this.clearFileInputElement();
              }
            },
            error: (err: HttpErrorResponse) => {
              console.error('Error al procesar el archivo (getFileData):', err);
              this.fileError.set(true);
              this.csfFile.set(null);
              this.clearFileInputElement();
            }
        });
      }
    });
  }

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
    if (!this.rfc()) {
      console.warn('RFC está vacío.');
      return;
    }
    this.userService.rfcToFetch.set(this.rfc());
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
    });
    this.loadingUser.set(true);
    this.userService.getUser(this.rfc(), headers)
      .pipe(finalize(() => this.loadingUser.set(false)))
      .subscribe({
        next: (res) => {
            if (!res.success && res.data === null) {
              this.stepService.setStep(3);
          } else {
            this.userService.user.set(res.data);
            this.userService.companyName.set(res.data.companyname);
            this.userService.taxRegim.set(res.data.taxregime);
            this.userService.zip.set(res.data.zip);
            this.userService.email.set(res.data.email);
            this.stepService.setStep(3);
          }
        },
    });
  }

  updateRfc(event: Event) {
    const input = event.target as HTMLInputElement;
    this.rfc.set(input.value);
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        this.csfFile.set(file);
        this.fileError.set(false);
      } else {
        this.csfFile.set(null);
        this.fileError.set(true);
        this.clearFileInputElement();
      }
    } else {
        this.csfFile.set(null);
        this.fileError.set(false);
        this.clearFileInputElement();
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        this.csfFile.set(file);
        this.fileError.set(false);
      } else {
        this.csfFile.set(null);
        this.fileError.set(true);
      }
    }
  }

  clearFile() {
    this.csfFile.set(null);
    this.fileError.set(false);
    this.clearFileInputElement();
  }

  private clearFileInputElement(): void {
    if (this.csfFileInputRef?.nativeElement) {
      this.csfFileInputRef.nativeElement.value = '';
    }
  }

  // Método para formatear tamaño de archivo
  formatFileSize(bytes: number | undefined | null): string {
    if (!bytes) return '0 KB';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  }
}