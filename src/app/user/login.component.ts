import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

// NgRx
import { Store } from '@ngrx/store';
import { State, getMaskUserName } from './state';

import { UserPageActions } from './state/actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  pageTitle = 'Log In';
  componentActive = true;
  errorMessage: string;

  maskUserName$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.maskUserName$ = this.store.select(getMaskUserName);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  cancel(): void {
    this.router.navigate(['home']);
  }

  checkChanged(): void {
    this.store.dispatch(UserPageActions.maskUserName());
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
