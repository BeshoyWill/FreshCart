import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { newPassword, email } from '../../../shared/interfaces/Data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css',
})
export class ForgetpasswordComponent {
  isLoading: boolean = false;
  errMsg!: string;
  emailFormFlag: boolean = true;
  codeFormFlag: boolean = false;
  newPasswordFlag: boolean = false;

  chosedEmail!: string;

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{4,}$/),
    ]),
  });

  newPassowrdForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{8,}$/),
    ]),
  });

  submitEmailForm() {
    if (this.emailForm.valid) {
      this.isLoading = true;
      this._AuthService.forgetPassword(this.emailForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this.chosedEmail = this.emailForm.value.email;

          // ^==========> Hide Email Form , Display Code Form
          this.emailFormFlag = false;
          this.codeFormFlag = true;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }

  submitCodeForm() {
    if (this.codeForm.valid) {
      this.isLoading = true;
      this._AuthService.verifyResetPassword(this.codeForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          // ^==========> Hide Code Form , Display New Password Form
          this.codeFormFlag = false;
          this.newPasswordFlag = true;
          console.log(this.chosedEmail);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }

  submitNewPasswordForm() {
    if (this.newPassowrdForm.valid) {
      this.isLoading = true;
      this._AuthService.resetNewPassword(this.newPassowrdForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          // ^==========> Save Token localStorage, Call decodeUserData(), navigate home page
          localStorage.setItem('userToken', res.token);
          this._AuthService.decodeUserData();
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }
}
