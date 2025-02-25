import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResetPasswordService } from '../../../core/services/resetPassword/reset-password.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  steps: number = 1;

  isLoading: boolean = false;

  constructor(
    private reset: ResetPasswordService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  sendEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  submitEmail() {
    this.reset.verifyEmail(this.sendEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg == 'success') {
          this.steps = 2;
          this.toastr.success(res.message, 'success');
        }
      },
      error: (err) => {},
    });
  }

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6}$/),
    ]),
  });

  submitCode() {
    this.reset.verifyCode(this.verifyCode.value).subscribe({
      next: (res) => {
        if (res.status == 'Success') {
          this.steps = 3;
        }
      },
      error: (err) => {},
    });
  }

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7}$/),
    ]),
  });

  submitPassword() {
    this.reset.resetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        if (res.token) {
          this.router.navigate(['/home']);
          localStorage.setItem('userToken', res.token);
          this.auth.decodeUserData();
        }
      },
      error: (err) => {},
    });
  }
}
