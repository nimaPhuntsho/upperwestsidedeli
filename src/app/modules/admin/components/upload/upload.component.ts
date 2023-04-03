import { CoffeeOrder } from './../../../../components/coffee/coffee.component';
import { DataService } from './../../../../data.service';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Product {
  productName: string;
  category: string;
  price: string;
  availability: string;
  ingredients: string;
}
export interface Coffee {
  productName: string;
  price: {
    small: number;
    medium: number;
    large: number;
  };
  availability: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  constructor(private afs: DataService) {}
  category = [
    'Croissant',
    'Bagel',
    'Sandwich',
    'Coffee',
    'Drinks',
    'Beer',
    'Pies',
  ];

  _productName: string = '';
  _category: string = '';
  _price: string = '';
  _availability: string = '';
  _ingredients: string = '';

  isCoffee = false;
  isSuccess = false;
  hasError = false;

  upload() {
    let product: Product = {
      productName: this._productName,
      category: this._category,
      price: this._price,
      availability: this._availability,
      ingredients: this._ingredients,
    };
    this.afs.addProduct(product);
    this.isSuccess = true;
  }

  uploadCoffee(reset: NgForm) {
    let coffee: Coffee = {
      productName: this._productName,
      availability: this._availability,
      price: {
        small: 4.5,
        medium: 5.5,
        large: 6.0,
      },
    };
    this.afs.addCoffee(coffee);
    reset.reset();
  }
}
