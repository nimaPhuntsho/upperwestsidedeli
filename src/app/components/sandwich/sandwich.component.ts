import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Product } from 'src/app/modules/admin/components/upload/upload.component';
import {
  faBagShopping,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sandwich',
  templateUrl: './sandwich.component.html',
  styleUrls: ['./sandwich.component.css'],
})
export class SandwichComponent {
  sandwich: Product[] = [];
  addIcon = faPlus;
  minusIcon = faMinus;
  cartList: Product[] = [];
  constructor(private data: DataService<Product>) {}
  ngOnInit() {
    this.data.getProducts('products', 'Sandwich').then((data) => {
      data?.subscribe((item) => {
        this.sandwich = item;
      });
    });
  }

  increment(index: number) {
    this.sandwich[index].quantity++;
  }

  decrement(index: number) {
    if (this.sandwich[index].quantity > 0) {
      this.sandwich[index].quantity--;
    }
  }

  getTotal(index: number) {
    this.sandwich[index].total =
      Number(this.sandwich[index].quantity) *
      Number(this.sandwich[index].price);
  }

  order(index: number) {
    let order: Product = {
      productName: this.sandwich[index].productName,
      total: this.sandwich[index].total,
      quantity: this.sandwich[index].quantity,
      availability: this.sandwich[index].availability,
      ingredients: this.sandwich[index].ingredients,
      category: '',
      price: this.sandwich[index].price,
      success: false,
    };
    // this.cartList.push(order);
    // this.data.sendData(this.cartList);
    this.data.sendData(order);
    this.sandwich[index].success = true;
  }

  resetFields(product: Product) {
    product.quantity = 0;
    product.total = 0;
    setTimeout(() => {
      product.success = false;
    }, 2000);
  }
}
