import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    page = signal(1);

    nextPage() {
        this.page.update((prev) => prev + 1);
    }

    backPage() {
        this.page.update((prev) => prev - 1);
    }
}