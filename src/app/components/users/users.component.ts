import { DataService } from 'src/app/data.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  displayName = '';

  constructor(public data: DataService, public auth: AuthService) {}

  ngOnInit() {
    this.data.name$.subscribe((user) => (this.displayName = user));
    console.log(this.displayName);
  }
}
