import { environment } from './../../../environments/environment.development';
import { firebase } from 'firebaseui-angular';
import { Product } from 'src/app/modules/admin/components/upload/upload.component';
import {
  addDoc,
  collectionData,
  doc,
  Firestore,
  getFirestore,
  increment,
  serverTimestamp,
} from '@angular/fire/firestore';
import { CoffeeOrder, CartCoffee } from './../coffee/coffee.component';
import { DataService } from './../../data.service';
import { Component, OnInit, OnDestroy, Type } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  collection,
  FieldValue,
  getCountFromServer,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { merge, Observable, combineLatest, forkJoin, map } from 'rxjs';
import {
  faBagShopping,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

import { Router } from '@angular/router';

export interface Sale {
  orderID: number;
  time: number;
  date: string;
  items: Product[];
  coffee: CartCoffee[];
  createdAt: FieldValue;
  total: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent<Type> {
  orderList: CartCoffee[] = [];
  coffeeTotal = 0;
  allTotal = 0;
  orderID = '';
  edit = false;
  checkOut = false;
  addIcon = faPlus;
  minusIcon = faMinus;
  checkOutSuccess = true;
  message = false;
  order: Sale = {} as Sale;
  isEmpty = false;
  allList: Product[] = [];

  allItem$: Product[] = [];
  coffee$: CartCoffee[] = [];
  cartTotal = 0;
  selectedCoffee?: CartCoffee;
  selectedItem?: Product;

  fake: CartCoffee[] = [
    {
      productName: 'NIMA',
      category: 'Drink',
      total: 44,
      quantity: 45,
      size: 4.5,
    },
    {
      productName: 'uuuuuuuuuuuuuuuuuuuuu',
      category: 'Drink',
      total: 44,
      quantity: 45,
      size: 4.5,
    },
  ];

  constructor(
    private data: DataService<CartCoffee>,
    private dataCroissant: DataService<Product>,
    private fs: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.allItem$ = this.data.getData();
    this.coffee$ = this.data.getCoffeeCart();
    this.getTotal();
  }

  getTotalAfterEdit(coffee: CartCoffee) {
    if (this.selectedCoffee) {
      this.selectedCoffee.total =
        this.selectedCoffee.size * this.selectedCoffee.quantity;
    }
    this.getTotal();
    this.selectedCoffee = undefined;
    this.edit = false;
  }

  totalAfterEdit(product: Product) {
    if (this.selectedItem) {
      this.selectedItem.total =
        Number(this.selectedItem.price) * this.selectedItem.quantity;
    }
    this.getTotal();
    this.selectedItem = undefined;
    this.edit = false;
  }

  getTotal() {
    let coffeeTotal = this.coffee$.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);

    let itemsTotal = this.allItem$.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);

    this.cartTotal = coffeeTotal + itemsTotal;
  }

  getItemTotal(index: number, product: Product[]) {
    product[index].total = product.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
  }

  editItems(coffee: CartCoffee) {
    this.selectedCoffee = coffee;
    this.edit = true;
  }

  increment(coffee: CartCoffee) {
    if (this.selectedCoffee) {
      this.selectedCoffee.quantity++;
    }
  }

  decrement(coffee: CartCoffee) {
    if (this.selectedCoffee) {
      if (this.selectedCoffee.quantity > 0) {
        this.selectedCoffee.quantity--;
      }
    }
  }

  editProduct(product: Product) {
    this.selectedItem = product;
    this.edit = true;
  }

  incrementItem(product: Product) {
    if (this.selectedItem) {
      this.selectedItem.quantity++;
    }
  }

  decrementItem(product: Product) {
    if (this.selectedItem) {
      if (this.selectedItem.quantity > 0) {
        this.selectedItem.quantity--;
      }
    }
  }

  deleteCoffee(coffee: CartCoffee) {
    if (this.selectedCoffee) {
      let index = this.coffee$.indexOf(coffee);
      this.coffee$.splice(index, 1);
    }
    this.selectedCoffee = undefined;
  }

  deleteItem(product: Product) {
    if (this.selectedItem) {
      let index = this.allItem$.indexOf(product);
      this.allItem$.splice(index, 1);
    }
    this.selectedItem = undefined;
  }

  async checkout() {
    if (confirm('Would you like to place the order?')) {
      let db = getFirestore();
      const collectionRef = collection(db, 'orders');
      let snapShot = await (await getCountFromServer(collectionRef)).data()
        .count;

      let date = new Date();
      this.order = {
        orderID: snapShot++,
        time: Timestamp.now().toDate().getTime(),
        date: Timestamp.now().toDate().toDateString(),
        items: this.allItem$,
        coffee: this.coffee$,
        createdAt: serverTimestamp(),
        total: this.cartTotal,
      };
      const coffeeData = addDoc(collection(db, 'orders'), this.order);
      const currentRef = doc(db, 'orders', (await coffeeData).id);
      await updateDoc(currentRef, {
        id: currentRef,
      });

      this.checkOutSuccess = false;
      this.message = true;
    }
  }

  ngOnDestroy() {
    this.coffee$.splice(0, this.coffee$.length);
    this.allItem$.splice(0, this.allItem$.length);
  }
}
