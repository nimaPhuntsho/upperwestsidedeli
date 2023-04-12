import { DataService } from 'src/app/data.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/admin/components/upload/upload.component';
import {
  faBagShopping,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

export interface Order {
  total: number;
  quantity: number;
  success: boolean;
}

@Component({
  selector: 'app-croissant',
  templateUrl: './croissant.component.html',
  styleUrls: ['./croissant.component.css'],
})
export class CroissantComponent {
  croissants: Product[] = [];
  addIcon = faPlus;
  minusIcon = faMinus;
  cartList: Product[] = [];

  constructor(private data: DataService<Product>) {}

  ngOnInit() {
    this.data.getProducts('products', 'Croissant').then((items) => {
      items?.subscribe((croissant) => {
        let order: Order = {
          total: 0,
          quantity: 0,
          success: false,
        };
        croissant.forEach((items) => {
          let croissantOrder = Object.assign(items, order);
          this.croissants.push(croissantOrder);
        });
      });
    });
  }

  increment(index: number) {
    this.croissants[index].quantity++;
  }

  decrement(index: number) {
    if (this.croissants[index].quantity > 0) {
      this.croissants[index].quantity--;
    }
  }

  getTotal(index: number) {
    this.croissants[index].total =
      Number(this.croissants[index].quantity) *
      Number(this.croissants[index].price);
  }

  order(index: number) {
    let order: Product = {
      productName: this.croissants[index].productName,
      total: this.croissants[index].total,
      quantity: this.croissants[index].quantity,
      availability: this.croissants[index].availability,
      ingredients: this.croissants[index].ingredients,
      category: this.croissants[index].category,
      price: this.croissants[index].price,
      success: false,
    };
    this.data.sendData(order);
    // this.data.setAllItem$(this.cartList);
    // this.data.sendData(this.cartList);
    this.croissants[index].success = true;
  }
}
