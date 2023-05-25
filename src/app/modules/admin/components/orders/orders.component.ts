import { doc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { ViewportScroller } from '@angular/common';
import { DataService } from 'src/app/data.service';
import { Component } from '@angular/core';
import { Sale } from 'src/app/components/cart/cart.component';

export interface OrderUid extends Sale {
  id: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  allOrders: OrderUid[] = [];
  selectedItem?: Sale;
  totalSales = 0;
  today = '';
  displayOrder: OrderUid[] = [];
  orderCompleted = false;
  constructor(
    private data: DataService<Sale>,
    private scroller: ViewportScroller
  ) {}

  ngOnInit() {
    this.data.getAllOrders().then((orders) => {
      orders?.subscribe((element) => {
        element.filter((sale) => {
          if (sale.isCompleted == false || sale.isCompleted == undefined) {
            this.allOrders.push(sale);
          }
        });
      });
    });
    this.today = new Date().toDateString();
  }

  prepare(product: Sale) {
    this.selectedItem = product;
  }

  cook() {
    let current = this.allOrders.shift();
    if (current && !current.isCompleted) this.displayOrder.push(current);
  }

  scroll(id: string) {
    this.scroller.scrollToAnchor(id);
  }
  getTotal() {
    this.totalSales = this.allOrders.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
  }

  async completed(order: OrderUid) {
    // console.log(id);
    // let db = getFirestore();
    // const ref = doc(db, 'orders', id);
    // await updateDoc(ref, {
    //   isComplete: true,
    // });
    // let index = this.displayOrder.indexOf(order);
    // this.displayOrder.splice(index, 1);
    this.allOrders.includes(order);
  }
}
