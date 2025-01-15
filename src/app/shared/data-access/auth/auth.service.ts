import { inject, Injectable } from '@angular/core';
import { Constants } from '../../utils/constants';
import { Auth } from '../../utils/interfaces/auth.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = `auth_${Constants.application}`;
  private plantKey = `plant_${Constants.application}`;
  private router: Router = inject(Router);

  setAuthStorage(auth: Auth) {
    localStorage.setItem(this.storageKey, JSON.stringify(auth));
  }

  getAuthStorage(): Auth | null {
    const auth = JSON.parse(
      localStorage.getItem(this.storageKey)!
    ) as Auth | null;
    return auth;
  }

  setPlantStorage(plant: string) {
    localStorage.setItem(this.plantKey, plant);
  }

  getPlantStorage(): string | null {
    return localStorage.getItem(this.plantKey);
  }

  isLoggedIn(): boolean {
    return !!this.getAuthStorage();
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    //Refetch the page to reset the application
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
