import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  displayName = '';

  constructor(public auth: AuthService) {}

  ngOnInit() {
    // this.auth.sendName();
    // this.auth.message$.subscribe((name) => (this.displayName = name));
    // console.log(this.displayName + 'name');
  }
}
