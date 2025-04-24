import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../../shared/utils/interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../../../shared/data-access/toast.service';
import { GeneralResponse } from '../../../shared/utils/interfaces/general-response.interface';
import { environment } from '../../../../environments/environment';
import { Service } from '../../../shared/utils/interfaces/service.interface';
import { Invoice } from '../../../shared/utils/interfaces/invoice.interface';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private BASE_API = environment.BASE_API;
    private http = inject(HttpClient);
    private toastService = inject(ToastService);

    rfcToFetch = signal("");
    user = signal<User | null>(null);
    folio = signal<string>("");
    zip = signal<number>(0);
    taxRegim = signal<string>("")
    taxRegimLabel = signal<string>("")
    companyName = signal<string>("")
    cfdi = signal<string>("")
    cfdiLabel = signal<string>("")
    email = signal<string>("")
    service = signal<number>(0);

    getUser(rfc: string, headers?: HttpHeaders) {
        return this.http.get<GeneralResponse<User>>(
        `${this.BASE_API}/user/${rfc}`,
        { headers }
        );
    }

    getFolio(folio: string, headers?: HttpHeaders) {
        return this.http.get<GeneralResponse<Service | Invoice>>(
        `${this.BASE_API}/buscarFolio/${folio}`,
        { headers }
        );
    }

    saveUser(user: User, headers?: HttpHeaders) {
        return this.http.post<GeneralResponse<User>>(
            `${this.BASE_API}/user`,
            user, { headers }
        )
    }

    getFileData(file: File) {
        const formData = new FormData();
        formData.append('archivo', file);
    
        return this.http.post<GeneralResponse<User>>(
          `${this.BASE_API}/csf/upload`,
          formData
        );
    }

    createInvoice(rfc: string, cfdi: string, folio: string) {
        return this.http.post<GeneralResponse<Invoice>>(`${this.BASE_API}/facturapi`, {}, {
          params: { rfc, cfdi, folio }
        })
    }

    getPdf(invoceId: string, type: 'pdf' | 'xml', headers?: HttpHeaders) {
        return this.http.get<Blob>(`${this.BASE_API}/facturapi/download/${invoceId}/${type}`,{ headers, responseType: 'blob' as 'json' })
    }

    sendMail(email: string, invoice_id: string) {
        return this.http.post<string>(`${this.BASE_API}/facturapi/email`, {}, {
          params: { email, invoice_id }
        })
      }
}