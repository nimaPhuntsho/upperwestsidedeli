import { Component } from '@angular/core';
import { Order, PaymentService } from './../../payment.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent {
  id = '';
  currentOrder: Order | undefined;
  placeholder = false;

  constructor(private dataSale: PaymentService) {}
  ngOnInit() {
    let storedId = localStorage.getItem('orderId');
    if (storedId) {
      this.id = storedId;
      console.log(this.id);
    }

    this.placeholder = true;
    this.dataSale.getAllProducts().then((res) => {
      res?.subscribe(async (data) => {
        const result = await data;
        result.forEach((element) => {
          if (element.id === this.id && element.paymentStatus === 'paid') {
            this.currentOrder = element;
            this.placeholder = false;
          }
        });
      });
    });
  }
}
