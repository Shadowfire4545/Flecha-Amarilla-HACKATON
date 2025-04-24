import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StepService } from "../data-access/step.service";
import { UserService } from "../data-access/user.service";

@Component({
    selector: 'folio-form',
    imports:[
        CommonModule,
        FormsModule,
    ],
    templateUrl: "./folio-form.component.html",
})
export class FolioFormComponent {
    stepService = inject(StepService);
    userService = inject(UserService);

    user = this.userService.user;

    folio: string = '';


    avanzar() {
        this.stepService.setStep(2);
        if(this.folio !== ''){
            this.stepService.setStep(2);
        }
    }
}