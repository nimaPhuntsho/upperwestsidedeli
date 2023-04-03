import { CoffeeOrder } from './../coffee/coffee.component';
import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  orderList: CoffeeOrder[] = [];
  grandTotal = 0;
  size = '';

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.message$.subscribe((element) => {
      this.orderList = element;
    });
    this.getTotal();
    this.data.sendOrderNumbers(this.orderList.length);
  }

  getTotal() {
    this.grandTotal = this.orderList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
  }
}
