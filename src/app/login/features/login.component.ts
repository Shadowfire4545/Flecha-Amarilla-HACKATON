import { Component, inject, OnInit, signal } from '@angular/core';
import { Constants } from '../../shared/utils/constants';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth, GeneralResponse, Google } from '../../shared/utils/interfaces/auth.interface';
import { LoadingService } from '../../shared/data-access/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginService } from '../data-access/login.service';
import { GooglePayload, LoginCrendential } from '../utils/login.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../shared/data-access/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/data-access/toast.service';
import { MatRipple } from '@angular/material/core';

declare let google: Google;

@Component({
  selector: 'app-login',
  imports: [
    FontAwesomeModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatRipple,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent implements OnInit {
  public appName = Constants.applicationName;
  public faSignIn = faSignIn;
  public isLoading = signal(false);
  public userForm = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  private loginService = inject(LoginService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }

  private initializeGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id: Constants.GOOGLE_ID,
      auto_select: true,
      callback: this.handleGoogleSignIn.bind(this),
    });
    const loginButton = document.getElementById('loginGoogle');
    if (loginButton) {
      google.accounts.id.renderButton(loginButton, {
        type: 'standard',
        shape: 'pill',
        theme: 'filled_blue',
        size: 'large',
        width: loginButton.offsetWidth,
      });
      window.addEventListener('resize', () => {
        google.accounts.id.renderButton(loginButton, {
          type: 'standard',
          shape: 'pill',
          theme: 'filled_blue',
          size: 'large',
          width: loginButton.offsetWidth,
        });
      });
    }
    google.accounts.id.prompt();
  }

  private handleGoogleSignIn(response: {
    credential: string;
    select_by: string;
  }): void {
    const payload = this.decodeJwt(response.credential);
    this.signInWithGoogle(payload);
  }

  private decodeJwt(token: string): GooglePayload {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  signIn(): void {
    this.isLoading.set(true);
    this.userForm.disable();

    const userToAuthenticate: LoginCrendential = {
      ...this.userForm.value,
      application: Constants.application,
    };

    this.loginService.auth(userToAuthenticate).subscribe({
      next: (res) => this.handleAuthSuccess(res),
      error: (error: HttpErrorResponse) => this.handleAuthError(error),
    });
  }

  signInWithGoogle(payload: GooglePayload): void {
    this.isLoading.set(true);
    this.userForm.disable();

    const userToAuthenticate: LoginCrendential = {
      user: payload.email,
      application: Constants.application,
      googleImage: payload.picture,
    };

    this.loginService.auth(userToAuthenticate).subscribe({
      next: (res) => this.handleAuthSuccess(res),
      error: (error: HttpErrorResponse) => this.handleAuthError(error),
    });
  }

  private handleAuthSuccess(res: GeneralResponse<Auth>): void {
    if (!res.success) {
      this.toastService.error('Error', res.message);
      this.isLoading.set(false);
      this.userForm.enable();
      return;
    }
    this.authService.setAuthStorage(res.data);
    this.toastService.success(
      'Success',
      `Welcome ${res.data.user.name} to ${this.appName}`
    );
    this.isLoading.set(false);
    this.router.navigate([`/home`]);
  }

  private handleAuthError(error: HttpErrorResponse): void {
    this.toastService.error(error.name, error.error.message);
    this.isLoading.set(false);
    this.userForm.enable();
  }
}
