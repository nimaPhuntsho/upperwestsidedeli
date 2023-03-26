import { Product } from './../../modules/admin/components/upload/upload.component';
import { Component } from '@angular/core';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { retry } from 'rxjs';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css'],
})
export class CoffeeComponent {
  cart = faBagShopping;
  coffee = [
    {
      name: 'Mocha',
      ingredients: 'Milk, sugar, marsh',
      price: {
        small: 4.5,
        medium: 5.5,
        large: 6.5,
      },
    },

    {
      name: 'Cuppacino',
      ingredients: 'Milk, chocolate',
      price: {
        small: 4.5,
        medium: 5.5,
        large: 6.5,
      },
    },
    {
      name: 'Esspreso',
      ingredients: 'water, sugar, marsh',
      price: {
        small: 4.5,
        medium: 5.5,
        large: 6.5,
      },
    },
  ];

  value: number = 0;
  selectedSize: number = 0;
  totalAmount: number = 0;

  increment() {
    this.value++;
  }

  decrement() {
    this.value--;
    if (this.value < 0) {
      this.value = 0;
    }
    this.totalAmount = this.selectedSize * this.value;
  }

  getTotal() {
    this.totalAmount = this.selectedSize * this.value;
  }
}
