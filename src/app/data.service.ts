import { Feedback } from './components/feedback/feedback.component';
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
import { inject, Injectable, Type } from '@angular/core';
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
  CollectionReference,
  deleteDoc,
} from 'firebase/firestore';
import { BehaviorSubject, Observable, timestamp } from 'rxjs';
import { Customer } from './components/login/login.component';
import { Sale } from './components/cart/cart.component';

@Injectable({
  providedIn: 'root',
})
export class DataService<Type> {
  cartItem$: Product[] = [];
  coffee$: CartCoffee[] = [];
  docRef?: CollectionReference<Product>;
  private observableOne: BehaviorSubject<Type[]> = new BehaviorSubject<Type[]>(
    []
  );
  private observableTwo: BehaviorSubject<Type[]> = new BehaviorSubject<Type[]>(
    []
  );

  private numberOfItems = new BehaviorSubject<number>(0);
  order$ = this.numberOfItems.asObservable();

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

  async sendFeedback(feedback: Feedback) {
    let db = getFirestore();
    const docRef = await addDoc(collection(db, 'feedbacks'), feedback);
  }

  async getFeedbacks() {
    try {
      const userProfileCollection = collection(this.fs, 'feedbacks');
      return collectionData(userProfileCollection) as Observable<Feedback[]>;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  addCoffee(coffee: Coffee) {
    let db = getFirestore();
    const docRef = addDoc(collection(db, 'coffee'), coffee);
  }

  async addUser(user: Customer) {
    let db = getFirestore();
    const docRef = await addDoc(collection(db, 'Users'), user);
  }

  setCoffee$(order: Type[]) {
    this.observableOne.next(order);
  }

  deleteItems(id: string, dbName: string) {
    let db = getFirestore();
    const collectionRef = collection(db, 'orders');
    id = collectionRef.id;
    deleteDoc(doc(db, dbName, id));
  }

  addItems(dbName: string, product: Product) {
    let db = getFirestore();
    const id = addDoc(collection(db, dbName), product).then((data) => {});
  }

  updateItems() {}

  setAllItem$(order: Type[]) {
    this.observableTwo.next(order);
  }

  sendOrderNumbers(orders: number) {
    this.numberOfItems.next(orders);
  }

  sendData(product: Product) {
    this.cartItem$.push(product);
  }

  sendCoffee(product: CartCoffee) {
    this.coffee$.push(product);
  }

  getData() {
    return this.cartItem$;
  }

  getCoffeeCart() {
    return this.coffee$;
  }
}
