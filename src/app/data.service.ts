import { firebase } from 'firebaseui-angular';
import { Admin } from './modules/admin/components/adminlogin/adminlogin.component';
import { CoffeeOrder, CartCoffee } from './components/coffee/coffee.component';
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
  Timestamp,
  increment,
  orderBy,
} from 'firebase/firestore';
import { BehaviorSubject, Observable, timestamp } from 'rxjs';
import { Customer } from './components/login/login.component';
import { Sale } from './components/cart/cart.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messageSource = new BehaviorSubject<CartCoffee[]>([]);
  message$ = this.messageSource.asObservable();

  private numberOfItems = new BehaviorSubject<number>(0);
  order$ = this.numberOfItems.asObservable();

  private userName = new BehaviorSubject<string>('');
  name$ = this.userName.asObservable();

  constructor(private fs: Firestore) {}

  async getProducts(dbName: string, category: string) {
    try {
      const userProfileCollection = query(
        collection(this.fs, dbName),
        where('category', '==', category)
      );
      return collectionData(userProfileCollection) as Observable<Product[]>;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async getAllProducts() {
    try {
      const userProfileCollection = query(collection(this.fs, 'products'));
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

  async getAllOrders() {
    try {
      const userProfileCollection = query(
        collection(this.fs, 'orders'),
        orderBy('createdAt')
      );
      return collectionData(userProfileCollection) as Observable<Sale[]>;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async getAdminCredentials() {
    try {
      const userProfileCollection = collection(this.fs, 'Admin');
      return collectionData(userProfileCollection) as Observable<Admin[]>;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async addProduct(product: Product) {
    let db = getFirestore();
    const docRef = await addDoc(collection(db, 'products'), product);
  }

  addCoffee(coffee: Coffee) {
    let db = getFirestore();
    const docRef = addDoc(collection(db, 'coffee'), coffee);
  }

  async addUser(user: Customer) {
    let db = getFirestore();
    const docRef = await addDoc(collection(db, 'Users'), user);
  }

  sendMessage(order: CartCoffee[]) {
    this.messageSource.next(order);
  }

  sendOrderNumbers(orders: number) {
    this.numberOfItems.next(orders);
  }

  sendName(name: string) {
    this.userName.next(name);
  }
}
