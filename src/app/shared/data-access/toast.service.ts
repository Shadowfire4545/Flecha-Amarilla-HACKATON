import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

export interface ToastConfig {
  override?: Partial<IndividualConfig>;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {
    // Config
    this.toastr.toastrConfig.enableHtml = true;
    // ngx-toastr class is necessary to keep origial toast styles
    this.toastr.toastrConfig.toastClass = 'ngx-toastr custom-toast';
    this.toastr.toastrConfig.preventDuplicates = true;
    this.toastr.toastrConfig.extendedTimeOut = 7000;
    this.toastr.toastrConfig.timeOut = 5000;
  }

  warning(title: string, message: string, config?: ToastConfig) {
    this.toastr.warning(message, title, config?.override);
  }

  info(title: string, message: string, config?: ToastConfig) {
    this.toastr.info(message, title, config?.override);
  }

  error(title: string, message: string, config?: ToastConfig) {
    this.toastr.error(message, title, config?.override);
  }

  success(title: string, message: string, config?: ToastConfig) {
    this.toastr.success(message, title, config?.override);
  }
}
