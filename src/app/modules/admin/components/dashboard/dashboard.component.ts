import { LogoutDailogComponent } from './../logout-dailog/logout-dailog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../../../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBars,
  faXmark,
  faPlus,
  faFilePen,
  faArrowUpShortWide,
  faMessage,
  faChartLine,
  faRightFromBracket,
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
  logout = faRightFromBracket;

  route: string = '';
  active = false;
  userName = '';

  constructor(
    public router: Router,
    private auth: AuthService,
    private dialog: MatDialog
  ) {
    this.route = this.router.url;
  }

  ngOnInit() {
    if (this.auth.user?.firstName) {
      this.userName = this.auth.user.firstName;
      console.log(this.userName);
    }
  }

  toogle() {
    this.active = !this.active;
  }

  clear() {
    this.active = false;
  }

  adminLogout() {
    let dialogRef = this.dialog.open(LogoutDailogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.auth.logout();
      }
    });
  }
}
