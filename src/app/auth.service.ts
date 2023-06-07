import { addDoc, getFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/modules/admin/components/upload/upload.component';
import { DataService } from 'src/app/data.service';
import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, retry, Observable } from 'rxjs';

export interface UserModel {
  userId: string;
  firstName: string;
  admin: boolean;
}

export interface MyAdmin {
  uid: string;
  emial: string;
  role: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = '';
  userName = '';
  user: UserModel | undefined;
  upperAdmin = false;

  admin$: Observable<MyAdmin> | undefined;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private data: DataService<Product>
  ) {
    let db = getFirestore();
    this.auth.authState.forEach((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          this.userData = token;
          const jwt = this.userData.split('.')[1];
          // localStorage.setItem('admin', JSON.stringify(jwt));
          this.user = this.getUser(token) as UserModel;
        });
      }
    });
  }

  getUser(token: string): UserModel {
    const payLoad = JSON.parse(window.atob(token.split('.')[1]));
    const user: UserModel = {
      userId: payLoad.user_id,
      firstName: payLoad.name,
      admin: payLoad.admin,
    };
    return user;
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('user');
    });
    this.router.navigate(['login']);
  }

  // getJWT() {
  //   return this.auth.user.subscribe((current) => current?.getIdToken());
  // }

  async signIn() {
    const log = await this.auth.signInWithPopup(new GoogleAuthProvider());
    const result = await log.user?.getIdTokenResult();
    const tok = result;
    console.log(tok);
  }

  googleLogin() {
    let db = getFirestore();
    this.auth.signInWithPopup(new GoogleAuthProvider()).then(async (result) => {
      result.user?.getIdToken().then((token) => {
        localStorage.setItem('admin', token);
        this.user = this.getUser(token) as UserModel;
        if (this.user.admin) {
          this.router.navigate(['myadmin']);
        } else {
          alert('Invalid username and password');
          localStorage.removeItem('admin');
          this.router.navigate(['login']);
        }
      });
    });
  }
}
