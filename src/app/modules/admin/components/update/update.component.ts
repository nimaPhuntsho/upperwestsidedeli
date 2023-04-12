import { map } from 'rxjs';
import {
  addDoc,
  collection,
  collectionChanges,
  collectionData,
  getFirestore,
} from '@angular/fire/firestore';
import { Coffee, Product } from './../upload/upload.component';
import { DataService } from 'src/app/data.service';
import { Component } from '@angular/core';
import { doc, deleteDoc } from 'firebase/firestore';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent {
  allCoffee: Coffee[] = [];
  allProducts: Product[] = [];
  selectedItem?: Product;

  constructor(private data: DataService<Product>) {}

  ngOnInit() {
    this.data.getCoffee().then((coffee) => {
      coffee?.subscribe((element) => {
        this.allCoffee = element;
      });
    });

    this.data.getAllProducts().then((products) => {
      products?.subscribe((element) => {
        this.allProducts = element;
      });
    });
  }

  removeItem(product: Product) {
    let db = getFirestore();
    const item$ = collectionChanges(collection(db, 'orders')).pipe(
      map((items) => {
        items.map((item) => {
          // const id = item.doc.id;
          // return { id };
        });
      })
    );
  }
}
