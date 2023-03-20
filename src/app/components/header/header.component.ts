import { Component } from '@angular/core';
import { faBars, faL } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuBar = faBars;
  close = faXmark;
  closeBtn = false;
  bar = true;
  sideNav = false;
  hide = true;

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
