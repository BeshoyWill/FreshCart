import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly _FormBuilder = inject(FormBuilder);

  isLoading: boolean = false;
  errMsg!: string;
  // Toggle variable to track visibility state
  isPasswordVisible: boolean = false;
  isRePasswordVisible: boolean = false;

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(8)],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)],
      ],
      rePassword: [
        null,
        [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)],
      ],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: this.confirmPassword }
  );

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  confirmPassword(g: AbstractControl<any, any>) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      g.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  submitRegister() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      // connect to api
      this._AuthService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;

          // this._Router.navigate(['/login'])
          this._Router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;

          // error happen because the user account already exist
          this.errMsg = err.error.message;
        },
      });
    }
  }

  // Method to toggle the password visibility
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Method to toggle the reset password visibility
  toggleRePasswordVisibility(): void {
    this.isRePasswordVisible = !this.isRePasswordVisible;
  }
}
