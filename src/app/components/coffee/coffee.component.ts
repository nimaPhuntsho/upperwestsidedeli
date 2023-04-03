import { NgForm } from '@angular/forms';
import { DataService } from './../../data.service';
import {
  Product,
  Coffee,
} from './../../modules/admin/components/upload/upload.component';
import { Component, inject } from '@angular/core';
import {
  faBagShopping,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { NgFor } from '@angular/common';

export interface CoffeeOrder {
  productName: string;
  price: number;
  total: number;
  quantity: number;
}

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css'],
})
export class CoffeeComponent {
  myProducts: Product[] = [];
  public coffee: Coffee[] = [];
  cart = faBagShopping;
  addIcon = faPlus;
  minusIcon = faMinus;
  quantity: number = 0;
  total = 0;
  orderList: CoffeeOrder[] = [];
  success = false;

  test: CoffeeOrder[] = [];
  constructor(private afs: DataService) {}

  ngOnInit() {
    let order = {
      total: 0,
      size: 0,
      quantity: 0,
    };
    this.afs.getCoffee().then((docs) => {
      docs?.subscribe((data) => {
        data.map((element) => {
          const myOrder = Object.assign({}, element, order);
          this.coffee.push(myOrder);
        });
      });
    });
  }

  increment(index: number) {
    console.log(Object.keys(this.coffee[index]));
  }

  decrement(coffee: CoffeeOrder) {}

  getTotal(index: number) {
    // this.coffee[index].total =
    //   this.coffee[index].quantity * this.coffee[index].size;
  }

  order(index: number) {
    // let order: CoffeeOrder = {
    //   productName: this.coffee[index].productName,
    //   price: this.coffee[index].size,
    //   total: this.coffee[index].total,
    //   quantity: this.coffee[index].quantity,
    // };
    // this.orderList.push(order);
    // this.afs.sendMessage(this.orderList);
  }
}
