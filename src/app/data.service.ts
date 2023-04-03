import { CoffeeOrder } from './components/coffee/coffee.component';
import {
  Product,
  Coffee,
} from './modules/admin/components/upload/upload.component';
import {
  getFirestore,
  Firestore,
  collectionData,
} from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  DocumentData,
} from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from './components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messageSource = new BehaviorSubject<CoffeeOrder[]>([]);
  message$ = this.messageSource.asObservable();

  private numberOfItems = new BehaviorSubject<number>(0);
  order$ = this.numberOfItems.asObservable();

  constructor(private fs: Firestore) {}

  async getProducts(name: string) {
    try {
      const userProfileCollection = collection(this.fs, name);
      return collectionData(userProfileCollection) as Observable<Product[]>;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async getCoffee() {
    try {
      const userProfileCollection = collection(this.fs, 'coffee');
      return collectionData(userProfileCollection) as Observable<Coffee[]>;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async getAdminCredentials() {
    try {
      const userProfileCollection = collection(this.fs, 'Admin');
      return collectionData(userProfileCollection) as Observable<Product[]>;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async addProduct(product: Product) {
    let db = getFirestore();
    const docRef = await addDoc(collection(db, 'products'), product);
  }

  async addCoffee(coffee: Coffee) {
    let db = getFirestore();
    const docRef = await addDoc(collection(db, 'coffee'), coffee);
  }

  async addUser(user: Customer) {
    let db = getFirestore();
    const docRef = await addDoc(collection(db, 'Users'), user);
  }

  sendMessage(order: CoffeeOrder[]) {
    this.messageSource.next(order);
  }

  sendOrderNumbers(orders: number) {
    this.numberOfItems.next(orders);
  }
}
