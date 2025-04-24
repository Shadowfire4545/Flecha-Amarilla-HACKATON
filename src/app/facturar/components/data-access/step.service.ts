import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StepService {
    public step = signal(1);

    setStep(step: number) {
        this.step.set(step);
    }

    getStep() {
        return this.step();
    }

    clearStep() {
        this.step.set(1);
    }

    retroceder() {
        if (this.step() > 1) {
            this.step.set(this.step() - 1);
        }
    }
}