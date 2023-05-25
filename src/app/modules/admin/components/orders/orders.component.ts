import { CartCoffee } from './../../../../components/coffee/coffee.component';
import { OrderCompleteDialogComponent } from './../../../../order-complete-dialog/order-complete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { doc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { ViewportScroller } from '@angular/common';
import { DataService } from 'src/app/data.service';
import { Component } from '@angular/core';
import { Sale } from 'src/app/components/cart/cart.component';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { retry } from 'rxjs';

export interface OrderUid extends Sale {
  id: string;
  isComplete: boolean;
  paymentStatus: string;
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
  delete = faTrashCan;
  success = false;
  constructor(
    private data: DataService<Sale>,
    private scroller: ViewportScroller,
    private dialog: MatDialog
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
    if (current && !current.isComplete) this.displayOrder.push(current);
  }

  scroll(id: string) {
    this.scroller.scrollToAnchor(id);
  }
  getTotal() {
    this.totalSales = this.allOrders.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
  }

  completed(id: string) {
    let dialogRef = this.dialog.open(OrderCompleteDialogComponent);
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result === 'true') {
        let db = getFirestore();
        const ref = doc(db, 'orders', id);
        await updateDoc(ref, {
          isComplete: true,
        });
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 6200);
      }
    });
  }

  getSize(size: number): string {
    switch (size) {
      case 4.5:
        return 'Small';
        break;

      case 5.5:
        return 'Medium';
        break;
      default:
        return 'Large';
    }
    return '';
  }
}
