import { Component } from '@angular/core';
import {
  faBagShopping,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/data.service';
import { Product } from 'src/app/modules/admin/components/upload/upload.component';

@Component({
  selector: 'app-pies',
  templateUrl: './pies.component.html',
  styleUrls: ['./pies.component.css'],
})
export class PiesComponent {
  pies: Product[] = [];
  addIcon = faPlus;
  minusIcon = faMinus;
  cartList: Product[] = [];
  constructor(private data: DataService<Product>) {}
  ngOnInit() {
    this.data.getProducts('products', 'Pies').then((data) => {
      data?.subscribe((item) => {
        this.pies = item;
      });
    });
  }

  increment(index: number) {
    this.pies[index].quantity++;
  }

  decrement(index: number) {
    if (this.pies[index].quantity > 0) {
      this.pies[index].quantity--;
    }
  }

  getTotal(index: number) {
    this.pies[index].total =
      Number(this.pies[index].quantity) * Number(this.pies[index].price);
  }

  order(index: number) {
    let order: Product = {
      productName: this.pies[index].productName,
      total: this.pies[index].total,
      quantity: this.pies[index].quantity,
      availability: this.pies[index].availability,
      ingredients: this.pies[index].ingredients,
      category: '',
      price: this.pies[index].price,
      success: false,
    };
    // this.cartList.push(order);
    // this.data.sendData(this.cartList);
    this.data.sendData(order);
    this.pies[index].success = true;
  }
}
