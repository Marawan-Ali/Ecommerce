import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errMsg: string = '';
  isLoading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.isLoading = true;
      if (this.loginForm.valid) {
        this.auth.login(this.loginForm.value).subscribe({
          next: (res: any) => {
            this.isLoading = false;
            if (res.message == 'success') {
              this.router.navigate(['/home']);
              localStorage.setItem('userToken', res.token);
              this.auth.decodeUserData();
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.errMsg = err.error.message;
            console.log(err.error.message);
          },
        });
      }
    }
  }
}
