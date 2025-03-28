import { Component, effect, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../data-access/auth/auth.service';
import {
  faGear,
  faBars,
  faHome,
  faPowerOff,
  faUser,
  IconDefinition,
  faAngleDown,
  faCheck,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApplicationConfig } from '../../utils/interfaces/application.interface';
import { Constants } from '../../utils/constants';
import { Site } from '../../utils/interfaces/auth.interface';
import { NavbarService } from '../../data-access/navbar.service';
import { dropdownAnimation } from '../../utils/animations';

// PrimeNG Imports
import { RippleModule } from 'primeng/ripple';
import { DrawerModule } from 'primeng/drawer';
import { Popover, PopoverModule } from 'primeng/popover'

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive,
    // PrimeNG modules
    RippleModule,
    PopoverModule,
    DrawerModule
  ],
  templateUrl: './navbar.component.html',
  animations: [dropdownAnimation]
})
export class NavbarComponent implements OnInit {
  @ViewChild('sitesPanel') sitesPanel!: Popover;
  @ViewChild('userPanel') userPanel!: Popover;
  @ViewChild('appPanel') appPanel!: Popover;
  
  private navbarService = inject(NavbarService);

  // Mobile sidebar
  public sidebarVisible = false;

  // Icons
  public faPowerOff = faPowerOff;
  public faBars = faBars;
  public faArrowDown = faAngleDown;
  public faCheck = faCheck;
  public faSearch = faSearch;

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

  public siteSelected = this.navbarService.siteSelected;

  // Menu items
  public menu = this.navbarService.menu;

  public selectSite(site: Site) {
    this.siteSelected.set({
      id: site.idSite,
      name: site.name,
    });
    
    if (this.sitesPanel) {
      this.sitesPanel.hide();
    }
  }

  // Update menu icons and set the first site as selected
  ngOnInit(): void {
    if (this.sites) {
      const site = this.sites.find((s) => s.name === this.plant);
      if (site) {
        this.selectSite(site);
      } else if (this.sites.length > 0) {
        this.selectSite(this.sites[0]);
      }
    }
  }

  toggleMenu() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  
  onMobileMenuItemClick() {
    this.sidebarVisible = false;
  }

  logout() {
    this.navbarService.logout();
  }
}