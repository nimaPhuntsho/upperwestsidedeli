import { DataService } from 'src/app/data.service';
import { AuthService } from './../../../../auth.service';
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult,
} from 'firebaseui-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Admin {
  displayName: string;
  email: string;
}

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent {
  adminCredentials: Admin[] = [];
  admin: Admin = {} as Admin;
  constructor(
    private data: DataService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.data.getAdminCredentials().then((data) => {
      data?.subscribe((admin) => {
        this.adminCredentials = admin;
      });
    });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    const currentUser = signInSuccessData.authResult.user;
    let name = currentUser?.displayName;
    let email = currentUser?.email;
    this.adminCredentials.forEach((element) => {
      if (element.displayName === name && element.email === email) {
        this.router.navigate(['']);
      } else this.router.navigate(['']);
    });
  }

  errorCallback(errorData: FirebaseUISignInFailure) {}

  uiShownCallback() {}

  logout(url: string) {
    this.auth.logout(url);
  }

  // verifyAdmin(adminDB: Object, adminLC: Object): boolean {
  //   const valueOne = Object.values(adminDB);
  //   const valueTwo = Object.values(adminLC);
  //   for (let element of valueOne) {
  //     for (let data of valueTwo) {
  //       if (element === data) {
  //         return true;
  //       } else false;
  //     }
  //   }
  //   return true;
  // }

  get() {
    console.log(this.adminCredentials);
  }
}
