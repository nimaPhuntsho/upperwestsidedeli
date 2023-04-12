import { Product } from 'src/app/modules/admin/components/upload/upload.component';
import { DataService } from 'src/app/data.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult,
} from 'firebaseui-angular';
import { Router } from '@angular/router';

export interface Customer {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  currentUser?: string;
  jwt = '';
  hide = false;
  constructor(
    private auth: AuthService,
    private data: DataService<Product>,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.hide = true;
    }
    console.log(this.currentUser);
  }

  logout(url: string) {
    this.hide = false;
    this.auth.logout(url);
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    if (signInSuccessData.authResult.user?.displayName) {
      this.currentUser = signInSuccessData.authResult.user?.displayName;
    }
  }

  errorCallback(errorData: FirebaseUISignInFailure) {}

  uiShownCallback() {}
}
