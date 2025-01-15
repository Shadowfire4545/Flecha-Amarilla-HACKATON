import { effect, inject, Injectable, signal } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { AuthService } from './auth/auth.service';
import { injectQuery, injectQueryClient, QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom, Observable } from 'rxjs';
import { Auth, GeneralResponse, Menu } from '../utils/interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { faHome, faGear, faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from './toast.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private queryClient = inject(QueryClient);

  public BASE_API = environment.BASE_API;

  public siteSelected = signal<{ id: number, name: string } | null>(null);
  public menu = signal<{ id: number; name: string; idFatherMenu: string | null, link: string, icon?: IconDefinition }[]>([]);
  public userImage = signal<string | null>(null);

  public user = this.authService.getAuthStorage()?.user;
  public sites = this.authService.getAuthStorage()?.sites;
  public loginType = this.authService.getAuthStorage()?.loginType;
  public version = this.authService.getAuthStorage()?.version;
  public plantStorage = this.authService.getPlantStorage();

  constructor() {
    // Create effect to update menu when menus.data changes
    effect(() => {
      if (this.menus.data()) {
        const mappedMenu = this.menus.data()?.map(m => ({
          id: m.idMenu,
          name: m.name,
          link: m.link,
          idFatherMenu: m.idFatherMenu,
          // icon: this.getIcon(m.name)
        })) || [];

        this.menu.set(mappedMenu);
      }
    });

    // Create effect to update siteSelected when plantStorage changes
    effect(() => {
      if (this.siteSelected()) {
        this.authService.setPlantStorage(this.siteSelected()?.name!);
      }
    })

    effect(() => {
      if (this.userImageQuery.data()) {
        const userImageData = this.userImageQuery.data();
        if (userImageData !== undefined) {
          this.userImage.set("data:image/png;base64," + userImageData);
        }
      }
    });
  }

  // Get menu options
  public menus = injectQuery(() => ({
    queryKey: ['menuOptions', this.siteSelected()?.name],
    queryFn: async () => {
      const res = await lastValueFrom(this.getMenuOptions()).catch((err) => {
        this.toastService.error("Failed to get menu", err.error.message);
      });
      return res?.data || [];
    },
    enabled: this.siteSelected !== null,
    refetchOnWindowFocus: false,
    retry(failureCount) {
      return failureCount < 0;
    },
  }));

  public userImageQuery = injectQuery(() => ({
    queryKey: ['userImage', this.user?.employeeNumber],
    queryFn: async () => {
      const res = await lastValueFrom(this.getUserImage()).catch((err) => {
        this.toastService.error("Failed to get user image", err.error.message);
        return null;
      });
      return res?.data || null;
    },
    enabled: !!this.user?.employeeNumber && !this.user?.googleImage,
    staleTime: Infinity,
    cacheTime: Infinity, // Don't cache between sessions
    refetchOnWindowFocus: false,
    refetchOnMount: false, // Allow refetch on mount
    refetchOnReconnect: false,
  }));

  public logout() {
    // Clear signals
    this.userImage.set(null);
    this.menu.set([]);
    this.siteSelected.set(null);
    
    // Invalidate and remove queries from cache
    this.queryClient.removeQueries({ queryKey: ['userImage'] });
    this.queryClient.removeQueries({ queryKey: ['menuOptions'] });
    
    // Clear storage and logout
    this.authService.logout();
  }

  private getMenuOptions(): Observable<GeneralResponse<Menu[]>> {
    return this.http.get<GeneralResponse<Menu[]>>(`${this.BASE_API}/menu`, { params: { plant: this.siteSelected()?.name! } });
  }

  private getUserImage() {
    return this.http.get<GeneralResponse<Blob>>(`${this.BASE_API}/user/getImageUser`, { params: { employee: this.user?.employeeNumber! } });  
  }

  // Function to add icons to the menu
  // private getIcon(name: string) {
  //   switch (name) {
  //     case 'Home':
  //       return faHome;
  //     case 'Config':
  //       return faGear;
  //     case 'Help':
  //       return faUser;
  //     case 'Contact us':
  //       return faUser;
  //     case 'Tutorials':
  //       return faUser;
  //     case 'Profiles':
  //       return faPowerOff;
  //     default:
  //       return faUser;
  //   }
  // }
}
