import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';
import { AuthService } from './shared/data-access/auth/auth.service';
import { NgxLoadingBar } from '@ngx-loading-bar/core';
import { FooterComponent } from './shared/ui/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NgxLoadingBar, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';

  private authService = inject(AuthService);

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
