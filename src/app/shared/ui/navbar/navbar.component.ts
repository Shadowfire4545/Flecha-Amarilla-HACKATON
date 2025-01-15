import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../data-access/auth/auth.service';
import {
  faGear,
  faBars,
  faHome,
  faPowerOff,
  faUser,
  IconDefinition,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ApplicationConfig } from '../../utils/interfaces/application.interface';
import { Constants } from '../../utils/constants';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Menu, Site } from '../../utils/interfaces/auth.interface';
import { NavbarService } from '../../data-access/navbar.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'navbar',
  imports: [
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatRippleModule,
    MatMenuModule,
    MatFormFieldModule,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  private navbarService = inject(NavbarService);

  // Variable to control the mobile menu view
  private displayMenu = false;

  // Icons
  public faPowerOff = faPowerOff;
  public faBars = faBars;
  public faArrowDown = faAngleDown;

  // Application configuration
  public applicationConfig: ApplicationConfig = {
    applicationVersion: this.navbarService.version,
    masterPageVersionApp: Constants.masterPageVersion,
    application: Constants.application,
    applicationName: Constants.applicationName,
    ico: Constants.ico,
  };

  // Get data from the navbar service
  public user = this.navbarService.user;
  public sites = this.navbarService.sites;
  public loginType = this.navbarService.loginType;
  public plant = this.navbarService.plantStorage;

  // User image
  public userImage = this.navbarService.userImage;

  // Signal to send the selected site and project
  public siteSelected = this.navbarService.siteSelected;

  // Menu items
  public menu = this.navbarService.menu;

  public selectSite(site: Site) {
    this.siteSelected.set({
      id: site.idSite,
      name: site.name,
    });
  }

  // Update menu icons and set the first site as selected
  ngOnInit(): void {
    if (this.sites) {
      const site = this.sites.find((s) => s.name === this.plant);
      if (site) {
        this.selectSite(site);
      } else {
        this.selectSite(this.sites[0]);
      }
    }
  }

  // Mobile menu view
  toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu && !this.displayMenu) {
      menu.classList.remove('invisible');
      menu.classList.remove('w-0');
      menu.classList.add('visible');
      menu.classList.add('w-1/2');
      this.displayMenu = true;
    } else {
      menu?.classList.remove('visible');
      menu?.classList.remove('w-1/2');
      menu?.classList.add('invisible');
      menu?.classList.add('w-0');
      this.displayMenu = false;
    }
  }

  logout() {
    this.navbarService.logout();
  }
}
