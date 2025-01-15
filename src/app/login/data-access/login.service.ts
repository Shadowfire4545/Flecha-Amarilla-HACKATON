import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginCrendential } from '../utils/login.interface';
import { Observable } from 'rxjs';
import { Auth, GeneralResponse } from '../../shared/utils/interfaces/auth.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public BASE_API: string = environment.BASE_API;
  private http = inject(HttpClient);

  auth(credential: LoginCrendential): Observable<GeneralResponse<Auth>> {
    return this.http.post<GeneralResponse<Auth>>(`${this.BASE_API}/auth/user/`, credential);
  }
}
