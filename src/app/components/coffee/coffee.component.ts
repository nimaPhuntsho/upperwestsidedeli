import { Product } from './../../modules/admin/components/upload/upload.component';
import { Component } from '@angular/core';
import {
  faBagShopping,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css'],
})
export class CoffeeComponent {
  cart = faBagShopping;
  add = faPlus;
  minus = faMinus;
  coffee = [
    {
      name: 'Mocha',
      ingredients: 'Milk, sugar, marsh, water, cinnomon',
      price: {
        small: 4.5,
        medium: 5.5,
        large: 6.5,
      },
      size: 0,
      value: 0, // store the number of particular order
      total: 0,
    },

    {
      name: 'Cuppacino',
      ingredients: 'Milk, chocolate',
      price: {
        small: 4.5,
        medium: 5.5,
        large: 6.5,
      },
      size: 0,
      value: 0,
      total: 0,
    },
    {
      name: 'Esspreso',
      ingredients: 'water, sugar, marsh',
      price: {
        small: 4.5,
        medium: 5.5,
        large: 6.5,
      },
      size: 0,
      value: 0,
      total: 0,
    },
  ];

  increment(index: number) {
    this.coffee[index].value++;
  }

  decrement(index: number) {
    if (this.coffee[index].value > 0) {
      this.coffee[index].value--;
    }
  }

  getTotal(index: number) {
    this.coffee[index].total =
      this.coffee[index].size * this.coffee[index].value;
  }

  // clearAll(index: number) {
  //   this.coffee[index].size = 0;
  //   this.coffee[index].value = 0;
  //   this.coffee[index].total = 0;
  // }

  addprob() {}
}
