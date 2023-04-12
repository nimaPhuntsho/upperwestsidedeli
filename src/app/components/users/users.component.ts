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

  constructor(public data: DataService<string>, public auth: AuthService) {}

  ngOnInit() {}
}
