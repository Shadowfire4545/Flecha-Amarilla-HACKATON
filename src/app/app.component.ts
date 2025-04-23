import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';
import { NgxLoadingBar } from '@ngx-loading-bar/core';
import { FooterComponent } from './shared/ui/footer/footer.component';
import { Constants } from './shared/utils/constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NgxLoadingBar, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = Constants.applicationName;
}
