import { ViewportScroller } from '@angular/common';
import { DataService } from 'src/app/data.service';
import { Component } from '@angular/core';
import { Sale } from 'src/app/components/cart/cart.component';

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
  displayOrder: Sale[] = [];
  orderCompleted = false;
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

  cook() {
    let current = this.allOrders.shift();
    if (current) this.displayOrder.push(current);
  }

  scroll(id: string) {
    this.scroller.scrollToAnchor(id);
  }
  getTotal() {
    this.totalSales = this.allOrders.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
  }

  removeOrder(item: Sale) {
    this.selectedItem = item;
    let index = this.displayOrder.indexOf(this.selectedItem);
    if (confirm('Order parpared confirmation')) {
      this.displayOrder.splice(index, 1);
      console.table(this.displayOrder);
    }
  }
}
