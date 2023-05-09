import { Product } from './../../modules/admin/components/upload/upload.component';
import { DataService } from 'src/app/data.service';
import { Component, OnChanges } from '@angular/core';
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
  constructor(public router: Router, private data: DataService<Product>) {}
  menuBar = faBars;
  close = faXmark;
  closeBtn = false;
  bar = true;
  sideNav = false;
  hide = true;
  cart = faCartShopping;
  cartItemCount = 0;

  ngOnInit() {
    this.cartItemCount = this.data.getCartLength();
    console.log(this.cartItemCount);
  }

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
