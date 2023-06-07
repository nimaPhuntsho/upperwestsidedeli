import { PaymentService } from './../../payment.service';
import { CheckoutDialogComponent } from './../../checkout-dialog/checkout-dialog.component';
import { DialogComponent } from './../../dialog/dialog.component';
import { Product } from 'src/app/modules/admin/components/upload/upload.component';
import { addDoc, doc, Firestore, getFirestore } from '@angular/fire/firestore';
import { CartCoffee } from './../coffee/coffee.component';
import { DataService } from './../../data.service';
import { Component } from '@angular/core';
import {
  collection,
  getCountFromServer,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { StripeService } from 'ngx-stripe';
import { MatDialog } from '@angular/material/dialog';

export interface Sale {
  orderID: number;
  time: number;
  date: string;
  items: Product[];
  coffee: CartCoffee[];
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
  emptyCartMessage = false;
  allList: Product[] = [];

  allItem$: Product[] = [];
  coffee$: CartCoffee[] = [];
  cartTotal = 0;
  selectedCoffee?: CartCoffee;
  selectedItem?: Product;
  cartItemsProducts: any = [];
  cartItemsCoffee: any[] = [];
  cartItems: any[] = [];
  myJoin: any[] = [];
  coffeeSize = '';
  spinner = false;

  fakeTwo: Product[] = [
    {
      productName: 'Gucci',
      availability: true,
      category: 'T-shirt',
      price: 4000,
      ingredients: 'cotten',
      total: 4000,
      quantity: 1,
      success: true,
    },
  ];

  fake: CartCoffee[] = [
    {
      productName: 'NIMA',
      category: 'Drink',
      total: 44,
      quantity: 45,
      size: 4.5,
    },
    {
      productName: 'uuuuu',
      category: 'Drink',
      total: 44,
      quantity: 45,
      size: 4.5,
    },
    {
      productName: 'uuuuuu',
      category: 'Drink',
      total: 44,
      quantity: 45,
      size: 4.5,
    },
    {
      productName: 'uuuu',
      category: 'Drink',
      total: 44,
      quantity: 45,
      size: 4.5,
    },
  ];

  // fakeOrder: Sale = {
  //   orderID: 1,
  //   time: 22,
  //   date: 'Date',
  //   items: this.fakeTwo,
  //   coffee: this.fake,
  //   total: 111,
  // };

  constructor(
    private data: DataService<CartCoffee>,
    private dataSale: PaymentService,
    private dataCroissant: DataService<Product>,
    private fs: Firestore,
    private router: Router,
    private scroller: ViewportScroller,
    private stripe: StripeService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.checkLocalStorage('coffee')) {
      let getCoffee = localStorage.getItem('coffee');
      if (getCoffee) {
        this.coffee$ = JSON.parse(getCoffee);
      }
    } else {
      this.coffee$ = this.data.getCoffeeCart();
    }

    if (this.checkLocalStorage('allItems')) {
      let getAllItems = localStorage.getItem('allItems');
      if (getAllItems) {
        this.allItem$ = JSON.parse(getAllItems);
      }
    } else this.allItem$ = this.data.getData();

    if (this.coffee$.length === 0 && this.allItem$.length === 0) {
      this.isEmpty = true;
      this.emptyCartMessage = true;
    } else {
      this.store('coffee', this.coffee$);
      this.storeItems('allItems', this.allItem$);
    }

    this.getTotal();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      height: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  store(key: string, item: CartCoffee[]) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  checkLocalStorage(key: string): boolean {
    let result = localStorage.getItem(key);
    if (result) return true;
    else return false;
  }

  storeItems(key: string, item: Product[]) {
    localStorage.setItem(key, JSON.stringify(item));
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

  editItems(coffee: CartCoffee) {
    this.scroll('edit-coffee');
    this.selectedCoffee = coffee;
    this.edit = true;
  }

  editProduct(product: Product) {
    this.scroll('edit-product');
    this.selectedItem = product;
    this.edit = true;
  }

  incrementItem(product: Product) {
    if (this.selectedItem) this.selectedItem.quantity++;
  }

  decrementItem(product: Product) {
    if (this.selectedItem) {
      if (this.selectedItem.quantity > 0) this.selectedItem.quantity--;
    }
  }

  deleteCoffee(coffee: CartCoffee) {
    if (this.selectedCoffee) {
      let index = this.coffee$.indexOf(coffee);
      this.coffee$.splice(index, 1);
      this.store('coffee', this.coffee$);
    }
    this.selectedCoffee = undefined;
    this.edit = false;
    this.getTotal();
  }

  deleteItem(product: Product) {
    if (this.selectedItem) {
      let index = this.allItem$.indexOf(product);
      this.allItem$.splice(index, 1);
      this.storeItems('allItems', this.allItem$);
    }
    this.selectedItem = undefined;
    this.edit = false;
    this.getTotal();
  }

  async checkout() {
    let dialogCheckRef = this.dialog.open(CheckoutDialogComponent);
    dialogCheckRef.afterClosed().subscribe(async (result) => {
      if (result === 'true') {
        const functions = getFunctions();
        const stripeCheckout = httpsCallable(functions, 'stripeCheckout');

        this.spinner = true;
        let db = getFirestore();
        const collectionRef = collection(db, 'orders');
        let snapShot = await (await getCountFromServer(collectionRef)).data()
          .count;
        this.order = {
          orderID: snapShot++,
          time: Timestamp.now().toDate().getTime(),
          date: Timestamp.now().toDate().toDateString(),
          items: this.allItem$,
          coffee: this.coffee$,
          total: this.cartTotal,
        };

        //add the order into the database and then retrieve the document reference.
        const coffeeData = await addDoc(collection(db, 'orders'), this.order);
        const currentRef = doc(db, 'orders', coffeeData.id);
        await updateDoc(currentRef, {
          id: currentRef.id,
        });

        localStorage.setItem('orderId', currentRef.id);

        //creating a stripe checkout session
        const payment = await stripeCheckout(currentRef.id);
        const paymentSession = await this.stripe
          .redirectToCheckout({
            sessionId: String(payment.data),
          })
          .subscribe((err) => console.log(err));

        //deleting the order from local storage
        this.checkOutSuccess = false;
        this.message = true;
        localStorage.removeItem('coffee');
        localStorage.removeItem('allItems');
        this.spinner = false;
      }
    });
  }
  scroll(id: string) {
    this.scroller.scrollToAnchor(id.toLowerCase());
  }

  getCupSize(coffee: CartCoffee) {
    switch (coffee.size) {
      case 4.5:
        this.coffeeSize = 'Small';
        break;
      case 5.5:
        this.coffeeSize = 'Medium';
        break;
      default:
        this.coffeeSize = 'Large';
    }
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

  cancelOrder() {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        localStorage.removeItem('coffee');
        localStorage.removeItem('allItems');
      }
    });
  }
}
