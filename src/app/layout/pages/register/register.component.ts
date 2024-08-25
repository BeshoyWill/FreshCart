import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading: boolean = false;
  errMsg!: string;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{8,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.checkRepasswordMatch }
  );

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  checkRepasswordMatch(g: AbstractControl<any, any>) {
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
}
