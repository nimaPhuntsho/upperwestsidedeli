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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private name = new Subject<string>();
  message$ = this.name.asObservable();
  userData = '';
  userName = '';

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private data: DataService<Product>
  ) {
    this.auth.authState.forEach((user) => {
      if (user) {
        user.getIdToken().then((token) => (this.userData = token));
        localStorage.setItem('user', JSON.stringify(this.userData));
        //JSON.parse(localStorage.getItem('user')!);
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
    return user !== null &&
      user.emailVerified !== false &&
      user.phoneNumber !== false
      ? true
      : false;
  }

  getJWT() {
    return this.auth.user.subscribe((current) => current?.getIdToken());
  }

  async signIn() {
    const log = await this.auth.signInWithPopup(new GoogleAuthProvider());
    const result = await log.user?.getIdTokenResult();
    const tok = result;
    console.log(tok);
  }
}
