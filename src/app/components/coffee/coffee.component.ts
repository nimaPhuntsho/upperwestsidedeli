import { timestamp } from 'rxjs';
import { firebase } from 'firebaseui-angular';
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
import {
  getFirestore,
  Firestore,
  collectionData,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

export interface CoffeeOrder extends Coffee {
  total: number;
  quantity: number;
  size: number;
  success: boolean;
  extra$: number;
}

export interface CartCoffee {
  productName: string;
  size: number;
  quantity: number;
  total: number;
  category: string;
}

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css'],
})
export class CoffeeComponent {
  myProducts: Product[] = [];
  coffee: Coffee[] = [];
  cart = faBagShopping;
  addIcon = faPlus;
  minusIcon = faMinus;
  quantity: number = 0;
  total = 0;
  orderList: CoffeeOrder[] = [];
  cartList: CartCoffee[] = [];
  success = false;

  test: CoffeeOrder[] = [];
  constructor(private afs: DataService<CartCoffee>) {}

  ngOnInit() {
    let order = {
      total: 0,
      size: 0,
      quantity: 0,
    };
    this.afs.getCoffee().then((docs) => {
      docs?.subscribe((data) => {
        this.coffee = data;
        this.coffee.forEach((element) => {
          let coffeeOrder = Object.assign(element, {
            quantity: 0,
            size: 0,
            total: 0,
            success: false,
            extra$: 0,
          });
          this.orderList.push(coffeeOrder);
        });
      });
    });
  }

  increment(index: number) {
    this.orderList[index].quantity++;
  }

  decrement(index: number) {
    if (this.orderList[index].quantity > 0) {
      this.orderList[index].quantity--;
    }
  }

  getTotal(index: number) {
    this.orderList[index].total =
      Number(this.orderList[index].quantity) *
        Number(this.orderList[index].size) +
      Number(this.orderList[index].extra$);
  }

  order(index: number, form: NgForm) {
    let order: CartCoffee = {
      productName: this.orderList[index].productName,
      size: this.orderList[index].size,
      total: this.orderList[index].total,
      quantity: this.orderList[index].quantity,
      category: this.orderList[index].category,
    };
    this.afs.sendCoffee(order);
    this.orderList[index].success = true;
    this.success = true;
  }

  resetFields(coffee: CartCoffee) {
    coffee.quantity = 0;
    coffee.total = 0;
    coffee.size = 0;
  }

  disableSuccessPrompt(coffee: CoffeeOrder) {
    setTimeout(() => {
      coffee.success = false;
    }, 2000);
  }
}
