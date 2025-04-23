import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { environment } from '../../../environments/environment';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private http = inject(HttpClient);
  private toastService = inject(ToastService);

  public BASE_API = environment.BASE_API;

  
}
