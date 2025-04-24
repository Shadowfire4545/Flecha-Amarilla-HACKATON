import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../../shared/utils/interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../../../shared/data-access/toast.service';
import { GeneralResponse } from '../../../shared/utils/interfaces/general-response.interface';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private BASE_API = environment.BASE_API;
    private http = inject(HttpClient);
    private toastService = inject(ToastService);

    rfcToFetch = signal("");

    user = signal<User | null>(null);

    getUser(rfc: string, headers?: HttpHeaders) {
        return this.http.get<GeneralResponse<User>>(
        `${this.BASE_API}/user/${rfc}`,
        { headers }
        );
    }
}