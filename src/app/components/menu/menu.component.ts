import { CartCoffee } from './../coffee/coffee.component';
import { Coffee } from './../../modules/admin/components/upload/upload.component';
import { Product } from 'src/app/modules/admin/components/upload/upload.component';
import { AuthService } from './../../auth.service';
import { ViewportScroller } from '@angular/common';
import { Component, DoCheck, OnChanges } from '@angular/core';
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
  cartLength: Product[] = [];
  length = 0;
  constructor(
    private scroller: ViewportScroller,
    public router: Router,
    private data: DataService<Product>,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  scroll(index: number, category: string) {
    this.scroller.scrollToAnchor(category.toLowerCase());
    this.selectedCategory = index;
  }

  badgeCounter(counter: number) {
    console.log(counter);
  }

  stopOrders() {
    let now = new Date().getHours();
    let tradingHours = now >= 17 || now <= 8;
    if (tradingHours) {
      alert(
        'Our store is closed at the moment and we are not taking any online orders, Please see our trading hours. THANK YOU'
      );
    }
  }
}
