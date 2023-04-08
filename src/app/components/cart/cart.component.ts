import {
  addDoc,
  collectionData,
  Firestore,
  getFirestore,
  increment,
  serverTimestamp,
} from '@angular/fire/firestore';
import { CoffeeOrder, CartCoffee } from './../coffee/coffee.component';
import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { collection, FieldValue, Timestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import {
  faBagShopping,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';

export interface Sale {
  orderID: string;
  time: number;
  date: string;
  items: CartCoffee[];
  createdAt: FieldValue;
  total: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  orderList: CartCoffee[] = [];
  grandTotal = 0;
  orderID = '';
  edit = false;
  checkOut = false;
  addIcon = faPlus;
  minusIcon = faMinus;
  checkOutSuccess = true;
  message = false;
  order: Sale = {} as Sale;
  isEmpty = false;

  constructor(
    private data: DataService,
    private fs: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.data.message$.subscribe((element) => {
      this.orderList = element;
    });
    this.getTotal();
    this.generateID();
    if (this.orderList.length === 0) {
      this.isEmpty = true;
    }
  }

  getTotalAfterEdit(index: number) {
    this.orderList[index].total =
      this.orderList[index].size * this.orderList[index].quantity;
    this.getTotal();
    this.edit = false;
  }

  getTotal() {
    this.grandTotal = this.orderList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
  }

  generateID() {
    let today = new Date();
    let orderIDFormat = String(today.getDay()) + String(today.getMonth());
    try {
      const userProfileCollection = collection(this.fs, 'orders');
      collectionData(userProfileCollection).forEach((element) => {
        this.orderID = orderIDFormat + element.length++;
      });
    } catch (error) {
      console.log(error);
    }
    return;
  }

  editItems(index: number) {
    this.edit = true;
  }

  increment(index: number) {
    this.orderList[index].quantity++;
  }

  decrement(index: number) {
    if (this.orderList[index].quantity > 0) {
      this.orderList[index].quantity--;
    }
  }

  async checkout() {
    let db = getFirestore();
    let date = new Date();
    this.order = {
      orderID: this.orderID,
      time: date.getTime(),
      date: date.toDateString(),
      items: this.orderList,
      createdAt: serverTimestamp(),
      total: this.grandTotal,
    };
    const data = addDoc(collection(db, 'orders'), this.order);
    this.checkOutSuccess = false;
    this.message = true;
  }
}
