import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { PlaceholderComponent } from '../placeholder/placeholder.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PlaceholderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;
  isLoading: boolean = false;

  constructor(private _authService : AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onSubmitLogin() {
    this.isLoading = true;
    this._authService.submitLogin(this.loginForm!.value).subscribe({
      next: () => {
        this.isLoading = false;
      }, 
      error: (error) => {
        console.log(error);
      }
    });
  }
}
