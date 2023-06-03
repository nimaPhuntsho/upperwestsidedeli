import { Order } from './components/croissant/croissant.component';
import { Sale } from 'src/app/components/cart/cart.component';
import {
  ProductID,
  CoffeeID,
} from './modules/admin/components/update/update.component';
import { Feedback, FeedbackID } from './components/feedback/feedback.component';
import { Admin } from './modules/admin/components/adminlogin/adminlogin.component';
import { CartCoffee } from './components/coffee/coffee.component';
import {
  Product,
  Coffee,
} from './modules/admin/components/upload/upload.component';
import {
  getFirestore,
  Firestore,
  collectionData,
  updateDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { inject, Injectable, Type } from '@angular/core';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  orderBy,
  CollectionReference,
  deleteDoc,
} from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderUid } from './modules/admin/components/orders/orders.component';

@Injectable({
  providedIn: 'root',
})
export class DataService<Type> {
  cartItem$: Product[] = [];
  coffee$: CartCoffee[] = [];
  docRef?: CollectionReference<Product>;

  private observableTwo = new BehaviorSubject<Type[]>([]);
  private numberOfItems = new BehaviorSubject<number>(0);
  private badgeNumberSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public badgeNumber$: Observable<number> =
    this.badgeNumberSubject.asObservable();

  order$ = this.numberOfItems.asObservable();
  joined: any[] = [];

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
      return collectionData(userProfileCollection) as Observable<ProductID[]>;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async getCoffee() {
    try {
      const userProfileCollection = collection(this.fs, 'coffee');
      return collectionData(userProfileCollection) as Observable<CoffeeID[]>;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async getAllOrders() {
    try {
      const userProfileCollection = query(
        collection(this.fs, 'orders'),
        orderBy('time')
      );
      return collectionData(userProfileCollection) as Observable<OrderUid[]>;
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
    const ref = docRef.id;
    const newDoc = doc(db, 'products', ref);
    await updateDoc(newDoc, {
      id: ref,
    });
  }

  async sendFeedback(feedback: Feedback) {
    let db = getFirestore();
    const docRef = await addDoc(collection(db, 'feedbacks'), feedback);
    const ref = docRef.id;
    const newDoc = doc(db, 'feedbacks', ref);
    await updateDoc(newDoc, {
      id: ref,
    });
  }

  async getFeedbacks() {
    try {
      const userProfileCollection = collection(this.fs, 'feedbacks');
      return collectionData(userProfileCollection) as Observable<FeedbackID[]>;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async addCoffee(coffee: Coffee) {
    let db = getFirestore();
    const docRef = await addDoc(collection(db, 'coffee'), coffee);
    const ref = docRef.id;
    const newDoc = doc(db, 'coffee', ref);
    await updateDoc(newDoc, {
      id: ref,
    });
  }

  async deleteCoffee(id: string) {
    let db = getFirestore();
    await deleteDoc(doc(db, 'coffee', id));
  }

  async deleteFeedback(id: string) {
    let db = getFirestore();
    await deleteDoc(doc(db, 'feedbacks', id));
  }

  async deleteItems(id: string) {
    let db = getFirestore();
    await deleteDoc(doc(db, 'products', id));
  }

  addItems(dbName: string, product: Product) {
    let db = getFirestore();
    const id = addDoc(collection(db, dbName), product).then((data) => {});
  }

  async postFeedback(id: string) {
    let db = getFirestore();
    const ref = doc(db, 'feedbacks', id);
    await updateDoc(ref, {
      isPosted: true,
    });
  }

  async makeUnavailable(id: string) {
    let db = getFirestore();
    const ref = doc(db, 'products', id);
    await updateDoc(ref, {
      availability: false,
    });
  }

  async makeAvailable(id: string) {
    let db = getFirestore();
    const ref = doc(db, 'products', id);
    await updateDoc(ref, {
      availability: true,
    });
  }

  async coffeeUnavailable(id: string) {
    let db = getFirestore();
    const ref = doc(db, 'coffee', id);
    await updateDoc(ref, {
      availability: false,
    });
  }

  async coffeeAvailable(id: string) {
    let db = getFirestore();
    const ref = doc(db, 'coffee', id);
    await updateDoc(ref, {
      availability: true,
    });
  }

  setAllItem$(order: Type[]) {
    this.observableTwo.next(order);
  }

  sendOrderNumbers(orders: number) {
    this.numberOfItems.next(orders);
  }

  sendData(product: Product) {
    let storedItems = localStorage.getItem('allItems');
    if (storedItems) {
      this.cartItem$ = JSON.parse(storedItems);
    }
    this.cartItem$.push(product);
    localStorage.setItem('allItems', JSON.stringify(this.cartItem$));
  }

  sendCoffee(product: CartCoffee) {
    let storedCoffee = localStorage.getItem('coffee');
    if (storedCoffee) {
      this.coffee$ = JSON.parse(storedCoffee);
    }
    this.coffee$.push(product);
    localStorage.setItem('coffee', JSON.stringify(this.coffee$));
  }

  getCartLength() {
    this.joined = Object.assign({}, this.coffee$, this.cartItem$);
    return Array(this.joined).length;
  }

  getData() {
    return this.cartItem$;
  }

  getCoffeeCart() {
    return this.coffee$;
  }

  // updateBadgeNumber(badgeNumber: number) {
  //   this.badgeNumberSubject.next(badgeNumber);
  // }
}
