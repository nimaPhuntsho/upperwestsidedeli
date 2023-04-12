import { Product } from 'src/app/modules/admin/components/upload/upload.component';
import { DataService } from 'src/app/data.service';
import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
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
  currentUser = '';
  constructor(
    private auth: AuthService,
    private data: DataService<Product>,
    private router: Router
  ) {}

  ngOnInit() {}

  logout(url: string) {
    this.auth.logout(url);
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    if (signInSuccessData.authResult.user?.displayName) {
      this.currentUser = signInSuccessData.authResult.user?.displayName;

      // let user: Customer = {
      //   uid: JSON.stringify(currentUser?.uid),
      //   displayName: JSON.stringify(currentUser?.displayName),
      //   email: JSON.stringify(currentUser?.email),
      //   phone: JSON.stringify(currentUser?.phoneNumber),
      // };
      // this.data.addUser(user);
    }
  }

  errorCallback(errorData: FirebaseUISignInFailure) {}

  uiShownCallback() {}
}
