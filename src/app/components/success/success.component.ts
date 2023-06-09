import { Component } from '@angular/core';
import { Order, PaymentService } from './../../payment.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent {
  id = '';
  today = '';
  currentOrder: Order | undefined;
  placeholder = false;
  receipt = false;

  constructor(private dataSale: PaymentService) {}
  ngOnInit() {
    this.placeholder = true;
    this.receipt = false;
    let now = new Date();
    this.today = now.toDateString();

    let storedId = localStorage.getItem('orderId');
    if (storedId) {
      this.id = storedId;
    }

    this.dataSale.getAllProducts().then((res) => {
      res?.subscribe(async (data) => {
        const result = await data;
        result.forEach((element) => {
          if (element.id === this.id && element.paymentStatus === 'paid') {
            this.currentOrder = element;
            this.receipt = true;
            this.placeholder = false;
          }
        });
      });
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
