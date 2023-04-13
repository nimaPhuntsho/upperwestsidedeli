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
import { BehaviorSubject, Subject } from 'rxjs';
import { Customer } from './components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private name = new Subject<string>();
  message$ = this.name.asObservable();
  userData: any;
  userName = '';

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private data: DataService<Product>
  ) {
    this.auth.authState.forEach((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  logout(url: string) {
    this.auth.signOut().then(() => {
      localStorage.removeItem('user');
    });
    this.router.navigate([url]);
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ||
      user.emailVerified !== false ||
      user.phoneNumber !== false
      ? true
      : false;
  }

  sendName() {
    this.name.next(this.userName);
  }
}
