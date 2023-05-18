import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Sale } from './components/cart/cart.component';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private completedOrder = new BehaviorSubject<Sale>({
    orderID: 0,
    time: 0,
    date: '',
    items: [
      {
        productName: '',
        category: '',
        price: 0,
        availability: false,
        ingredients: '',
        total: 0,
        quantity: 0,
        success: false,
      },
    ],
    coffee: [
      {
        productName: '',
        size: 0,
        quantity: 0,
        total: 0,
        category: '',
      },
    ],
    total: 0,
  });
  currentSale = this.completedOrder.asObservable();

  private orderSubject: BehaviorSubject<Sale> = new BehaviorSubject<Sale>({
    orderID: 0,
    time: 0,
    date: '',
    items: [],
    coffee: [],
    total: 0,
  } as Sale);
  public currentOrder: Observable<Sale> = this.orderSubject.asObservable();

  private name: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentName: Observable<string> = this.name.asObservable();

  constructor() {}

  changeName(name_: string) {
    this.name.next(name_);
  }

  getName() {
    return this.name.asObservable();
  }

  changeOrder(order: Sale) {
    this.orderSubject.next(order);
  }
}
