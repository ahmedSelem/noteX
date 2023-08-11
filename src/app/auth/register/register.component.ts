import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToasterService } from 'src/app/shared/toaster.service';
import { PlaceholderComponent } from '../placeholder/placeholder.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PlaceholderComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() onRegisterSuccess = new EventEmitter<void>();
  registerForm?: FormGroup;
  isLoading: boolean = false;

  constructor(private _authService : AuthService, private _toasterService : ToasterService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      age: new FormControl(null, [Validators.required]),
    });
  }

  onSubmitRegister() {
    this.isLoading = true;
    this._authService.submitRegister(this.registerForm!.value).subscribe({
      next: (response) => {
        if(response.message === 'success') {
          this.onRegisterSuccess.next();
          this._toasterService.showToastSuccess('Register Success!');
        } else {
          this._toasterService.showToastError(response.errors.email.message);
        }
        this.isLoading = false;
      },
      error: (response) => {  
        this._toasterService.showToastError(response.errors.email.message);
        this.isLoading = false;
      }
    });
  }
}
