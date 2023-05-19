import { CartCoffee } from './components/coffee/coffee.component';
import { Product } from 'src/app/modules/admin/components/upload/upload.component';
import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, query } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Order {
  id: string;
  orderID: number;
  paymentStatus: string;
  coffee: CartCoffee[];
  items: Product[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private orderId: BehaviorSubject<string> = new BehaviorSubject<string>(
    'default id'
  );
  currentId: Observable<string> = this.orderId.asObservable();

  constructor(private fs: Firestore) {}

  changeID(id: string) {
    this.orderId.next(id);
  }

  getID(): Observable<string> {
    return this.orderId;
  }

  async getAllProducts() {
    try {
      const userProfileCollection = await query(collection(this.fs, 'orders'));
      return collectionData(userProfileCollection) as Observable<Order[]>;
    } catch (error) {
      console.log(error);
    }
    return;
  }
}
