import { Component } from '@angular/core';

export interface Product {
  productName: string;
  category: string;
  price: string;
  availability: string;
  ingredients: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
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

  log() {
    let product: Product = {
      productName: this._productName,
      category: this._category,
      price: this._price,
      availability: this._availability,
      ingredients: this._ingredients,
    };
    console.log(product);
  }
}
