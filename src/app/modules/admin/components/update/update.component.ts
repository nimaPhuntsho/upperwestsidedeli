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

export interface ProductID extends Product {
  id: string;
}

export interface CoffeeID extends Coffee {
  id: string;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent {
  allCoffee: CoffeeID[] = [];
  allProducts: ProductID[] = [];
  isSoldedOut = false;
  selectedCoffee: CoffeeID | undefined;

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

  removeItem(id: string) {
    if (confirm('Are you sure you want to delete the product?')) {
      this.data.deleteItems(id);
    }
  }

  soldOut(id: string) {
    if (confirm('Are you sure you want to make the product UNAVAILABLE?')) {
      this.data.makeUnavailable(id);
    }
  }

  available(id: string) {
    if (confirm('Are you sure you want to make the product AVAILABLE?')) {
      this.data.makeAvailable(id);
    }
  }

  removeCoffee(id: string) {
    if (confirm('Are you sure you want to delete the coffee?')) {
      this.data.deleteCoffee(id);
    }
  }

  soldOutCoffee(id: string) {
    if (confirm('Are you sure you want to make the coffee UNAVAILABLE?')) {
      this.data.coffeeUnavailable(id);
    }
  }

  availableCoffee(id: string) {
    if (confirm('Are you sure you want to make the coffee AVAILABLE?')) {
      this.data.coffeeAvailable(id);
    }
  }

  displaySoldOut(coffee: CoffeeID) {
    this.selectedCoffee = coffee;
    if (!this.selectedCoffee.availability) {
      this.isSoldedOut = true;
    }
  }
}
