import { Component, inject, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApplicationConfig } from '../../utils/interfaces/application.interface';
import { Constants } from '../../utils/constants';
import { NavbarService } from '../../data-access/navbar.service';
import { dropdownAnimation } from '../../utils/animations';

// PrimeNG Imports
import { RippleModule } from 'primeng/ripple';
import { DrawerModule } from 'primeng/drawer';
import { Popover, PopoverModule } from 'primeng/popover'
import { StepService } from '../../../facturar/components/data-access/step.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RippleModule,
    PopoverModule,
    DrawerModule
  ],
  templateUrl: './navbar.component.html',
  animations: [dropdownAnimation]
})
export class NavbarComponent {
  stepService = inject(StepService)
  @ViewChild('sitesPanel') sitesPanel!: Popover;
  @ViewChild('userPanel') userPanel!: Popover;
  @ViewChild('appPanel') appPanel!: Popover;
  
  private navbarService = inject(NavbarService);

  // Application configuration
  public applicationConfig: ApplicationConfig = {
    applicationVersion: Constants.applicationVersion,
    application: Constants.application,
    applicationName: Constants.applicationName,
  };

  async retroceder() {
    this.stepService.retroceder();
  }

}