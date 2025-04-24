import { Component, inject } from "@angular/core";
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { UserService } from "../data-access/user.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'descargar-factura',
    imports: [
        CommonModule,
        FormsModule,
    ],
    templateUrl: "./descargar-factura.component.html",
})
export class DescargarFacturaComponent {
    userService = inject(UserService);
    user = this.userService.user;

    correo: string = this.user()?.email || '';


}