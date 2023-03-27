import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBars,
  faXmark,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public router: Router) {}
  menuBar = faBars;
  close = faXmark;
  closeBtn = false;
  bar = true;
  sideNav = false;
  hide = true;
  cart = faCartShopping;

  displayClose() {
    this.closeBtn = true;
    this.bar = false;
    this.sideNav = true;
    this.hide = false;
  }

  displayBar() {
    this.bar = true;
    this.closeBtn = false;
    this.sideNav = false;
  }

  closeSideBar() {
    this.sideNav = false;
    this.bar = true;
    this.closeBtn = false;
  }
}
