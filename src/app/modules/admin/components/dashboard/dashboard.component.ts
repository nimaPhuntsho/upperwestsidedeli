import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBars,
  faXmark,
  faPlus,
  faFilePen,
  faArrowUpShortWide,
  faMessage,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  faBars = faBars;
  faXmark = faXmark;
  upload = faPlus;
  update = faFilePen;
  order = faArrowUpShortWide;
  review = faMessage;
  analysis = faChartLine;

  route: string = '';
  active = false;

  constructor(public router: Router) {
    this.route = this.router.url;
  }

  toogle() {
    this.active = !this.active;
  }

  clear() {
    this.active = false;
  }
}
