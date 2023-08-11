import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  currentUser? : User;
  subscription? : Subscription;
  constructor (private _authService : AuthService) {}
  

  onLogout() {
    this._authService.logOut();
  }

  ngOnInit(): void {
    this.subscription = this._authService.currentUser.subscribe((user) => {
      this.currentUser = user!;
      console.log(user);
      
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  
}
