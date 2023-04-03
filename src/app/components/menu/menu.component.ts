import { AuthService } from './../../auth.service';
import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCoffee,
  faBeer,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/data.service';

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
  numberOfOrders = 0;
  category = [
    'Coffee',
    'Beer',
    'Croissant',
    'Bagel',
    'Sandwich',
    'Drinks',
    'Pies',
  ];
  selectedCategory?: number;

  constructor(
    private scroller: ViewportScroller,
    public router: Router,
    private data: DataService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.data.order$.subscribe((data) => (this.numberOfOrders = data));
  }

  scroll(index: number, category: string) {
    this.scroller.scrollToAnchor(category.toLowerCase());
    this.selectedCategory = index;
  }
}
