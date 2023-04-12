import { CartCoffee } from './../../../../components/coffee/coffee.component';
import { ViewportScroller } from '@angular/common';
import { DataService } from 'src/app/data.service';
import { Component } from '@angular/core';
import { Sale } from 'src/app/components/cart/cart.component';
import { Product } from '../upload/upload.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  allOrders: Sale[] = [];
  selectedItem?: Sale;
  totalSales = 0;
  today = '';
  constructor(
    private data: DataService<Sale>,
    private scroller: ViewportScroller
  ) {}

  ngOnInit() {
    this.data.getAllOrders().then((orders) => {
      orders?.subscribe((element) => {
        this.allOrders = element;
      });
    });

    this.today = new Date().toDateString();
  }

  prepare(product: Sale) {
    this.selectedItem = product;
  }

  scroll(id: string) {
    this.scroller.scrollToAnchor(id);
  }
  getTotal() {
    this.totalSales = this.allOrders.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
  }
}
