import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCoffee,
  faBeer,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  coffee = faCoffee;
  beer = faBeer;
  cart = faCartShopping;
  products = [];

  constructor(private scroller: ViewportScroller, public router: Router) {}

  scroll(name: string) {
    this.scroller.scrollToAnchor(name);
  }
}
