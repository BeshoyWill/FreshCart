import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading: boolean = false;
  errMsg!: string;
  // Toggle variable to track visibility state
  isPasswordVisible: boolean = false;

  private readonly _FormBuilder = inject(FormBuilder);

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)],
    ],
  });

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  submitLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this._AuthService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          localStorage.setItem('userToken', res.token);
          this._AuthService.decodeUserData();
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }

  // Method to toggle the password visibility
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
