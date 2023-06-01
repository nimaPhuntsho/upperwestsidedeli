import { getAuth } from '@angular/fire/auth';
import { DataService } from 'src/app/data.service';
import { AuthService } from './../../../../auth.service';
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult,
} from 'firebaseui-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
  admin: Admin = {} as Admin;
  constructor(
    private data: DataService<Admin>,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    // this.data.getAdminCredentials().then((data) => {
    //   data?.subscribe((admin) => {
    //     this.adminCredentials = admin;
    //   });
    // });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    signInSuccessData.authResult.user?.getIdToken().then((custom) => {
      console.log(custom);
      console.log('ok');
    });
    // let name = currentUser?.displayName;
    // let email = currentUser?.email;
    // this.adminCredentials.forEach((element) => {
    //   if (element.displayName === name && element.email === email) {
    //     this.router.navigate(['']);
    //   } else this.router.navigate(['']);
    // });
    console.log('ok');
  }

  errorCallback(errorData: FirebaseUISignInFailure) {}

  uiShownCallback() {}

  logout(url: string) {
    this.auth.logout(url);
  }

  signInGoogle() {
    // const googleAuth = getAuth();
    // signInWithPopup(googleAuth, new GoogleAuthProvider()).then((result) => {
    //   const token = result.user.getIdToken().then((admin) => {
    //     console.log(admin);
    //   });
    // });
    this.auth.googleLogin();
  }
}
