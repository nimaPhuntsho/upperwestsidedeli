import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Product } from 'src/app/modules/admin/components/upload/upload.component';
import {
  faBagShopping,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],
})
export class DrinksComponent {
  drinks: Product[] = [];
  addIcon = faPlus;
  minusIcon = faMinus;
  cartList: Product[] = [];
  constructor(private data: DataService<Product>) {}
  ngOnInit() {
    this.data.getProducts('products', 'Drinks').then((data) => {
      data?.subscribe((item) => {
        this.drinks = item;
        console.log(this.drinks);
      });
    });
  }

  increment(index: number) {
    this.drinks[index].quantity++;
  }

  decrement(index: number) {
    if (this.drinks[index].quantity > 0) {
      this.drinks[index].quantity--;
    }
  }

  getTotal(index: number) {
    this.drinks[index].total =
      Number(this.drinks[index].quantity) * Number(this.drinks[index].price);
  }

  order(index: number) {
    let order: Product = {
      productName: this.drinks[index].productName,
      total: this.drinks[index].total,
      quantity: this.drinks[index].quantity,
      availability: this.drinks[index].availability,
      ingredients: this.drinks[index].ingredients,
      category: '',
      price: this.drinks[index].price,
      success: false,
    };
    // this.cartList.push(order);
    // this.data.sendData(this.cartList);
    this.data.sendData(order);
    this.drinks[index].success = true;
  }

  resetFields(product: Product) {
    product.quantity = 0;
    product.total = 0;
    setTimeout(() => {
      product.success = false;
    }, 2000);
  }
}
