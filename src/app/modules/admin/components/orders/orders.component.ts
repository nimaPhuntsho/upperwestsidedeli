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
  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getAllOrders().then((orders) => {
      orders?.subscribe((element) => {
        this.allOrders = element;
      });
    });
  }
}
