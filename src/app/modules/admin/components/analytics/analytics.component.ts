import { OrderUid } from './../orders/orders.component';
import { Component } from '@angular/core';
import { Sale } from 'src/app/components/cart/cart.component';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent {
  allOrders: OrderUid[] = [];
  completed = false;
  constructor(private data: DataService<Sale>) {}

  ngOnInit() {
    this.data.getAllOrders().then((orders) => {
      orders?.subscribe((element) => {
        this.allOrders = element;
      });
    });
  }

  completedOrder() {
    this.completed = true;
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
        return 'large';
    }
    return '';
  }
}
