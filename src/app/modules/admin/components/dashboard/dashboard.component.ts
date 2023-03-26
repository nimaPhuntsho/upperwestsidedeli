import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  faBars = faBars;
  faXmark = faXmark;
  route: string = '';
  activeBar: boolean = true;
  activeClose: boolean = false;

  constructor(public router: Router) {
    this.route = this.router.url;
  }

  removeBarIcon() {
    this.activeBar = false;
    this.activeClose = true;
  }

  addBarIcon() {
    this.activeClose = false;
    this.activeBar = true;
  }
}
