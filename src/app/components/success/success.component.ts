import { PaymentService } from './../../payment.service';
import { CartCoffee } from './../coffee/coffee.component';
import { Sale } from 'src/app/components/cart/cart.component';
import { Product } from './../../modules/admin/components/upload/upload.component';
import { DataService } from 'src/app/data.service';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent {
  id = '';
  myInter: Sale | undefined;
  constructor(private data: PaymentService) {}
  ngOnInit() {
    // this.data.currentOrder.subscribe((res) => {
    //   console.log(res);
    // });

    try {
      this.data.getName().subscribe((name: string) => {
        this.id = name;
        console.log(this.id);
      });

      this.data.currentName.subscribe((element) => {
        console.log(element);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
