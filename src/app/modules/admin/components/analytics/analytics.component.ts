import { Product } from './../upload/upload.component';
import { CartCoffee } from './../../../../components/coffee/coffee.component';
import { OrderUid } from './../orders/orders.component';
import { Component } from '@angular/core';
import { Sale } from 'src/app/components/cart/cart.component';
import { DataService } from 'src/app/data.service';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
export interface Query {
  category: string;
  date: string;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent {
  allOrders: OrderUid[] = [];
  completed = false;
  report = false;
  products = [
    'coffee',
    'beer',
    'croissant',
    'bagel',
    'sandwich',
    'drinks',
    'pies',
  ];

  selectedCategory = '';
  selectDate = '';
  sortedCoffee: CartCoffee[] = [];
  sortedProduct: Product[] = [];
  sortedBeer: Product[] = [];
  error = false;
  success = false;
  disable = true;
  productSuccess = false;
  total = 0;
  itemTotal = 0;

  constructor(private data: DataService<Sale>) {}

  ngOnInit() {
    this.data.getAllOrders().then((orders) => {
      orders?.subscribe((element) => {
        this.allOrders = element;
      });
      console.log(this.allOrders);
    });
  }

  completedOrder() {
    this.completed = true;
    this.report = false;
  }

  salesReport() {
    this.report = true;
    this.completed = false;
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
        return 'large';
    }
    return '';
  }

  date(picker: MatDatepicker<string>) {
    console.log(picker);
  }

  generateReport() {
    this.sortedCoffee.length = 0;
    this.sortedProduct.length = 0;
    this.allOrders.forEach((element) => {
      let coffee = element.coffee;
      if (this.selectedCategory.toLowerCase() === 'coffee') {
        coffee.filter((item) => {
          if (this.selectDate === element.date) {
            this.sortedCoffee.push(item);
            this.error = false;
            this.success = true;
            this.productSuccess = false;
          }
        });
      }

      if (this.selectedCategory.toLowerCase() === 'bagel') {
        element.items.filter((item) => {
          if (
            item &&
            element.date === this.selectDate &&
            item.category.toLowerCase() === 'bagel'
          ) {
            this.sortedProduct.push(item);
            this.error = false;
            this.productSuccess = true;
          } else {
            this.error = true;
            this.productSuccess = false;
          }
        });
      }
      if (this.selectedCategory.toLowerCase() === 'beer') {
        element.items.filter((item) => {
          if (
            element.date === this.selectDate &&
            item.category.toLowerCase() === 'beer'
          ) {
            this.sortedProduct.push(item);
            this.productSuccess = true;
            this.error = false;
            this.success = false;
          } else this.error = true;
        });
      }
      if (this.selectedCategory.toLowerCase() === 'croissant') {
        element.items.filter((item) => {
          if (
            element.date === this.selectDate &&
            item.category.toLowerCase() === 'croissant'
          ) {
            this.sortedProduct.push(item);
            this.productSuccess = true;

            this.success = false;
          }
        });
      }
      if (this.selectedCategory.toLowerCase() === 'sandwich') {
        element.items.filter((item) => {
          if (
            element.date === this.selectDate &&
            item.category.toLowerCase() === 'sandwich'
          ) {
            this.sortedProduct.push(item);
            this.productSuccess = true;

            this.success = false;
          }
        });
      }
      if (this.selectedCategory.toLowerCase() === 'drinks') {
        element.items.filter((item) => {
          if (
            element.date === this.selectDate &&
            item.category.toLowerCase() === 'drinks'
          ) {
            this.sortedProduct.push(item);
            this.productSuccess = true;

            this.success = false;
          }
        });
      }
      if (this.selectedCategory.toLowerCase() === 'pies') {
        element.items.filter((item) => {
          if (
            element.date === this.selectDate &&
            item.category.toLowerCase() === 'pies'
          ) {
            this.sortedProduct.push(item);
            this.productSuccess = true;

            this.success = false;
          }
        });
      }
    });
    this.coffeeTotal();
    this.productTotal();
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selected = event.value?.toDateString();
    if (selected) {
      this.selectDate = selected;
    }
  }

  coffeeTotal() {
    let coffeeTotal = this.sortedCoffee.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
    this.total = coffeeTotal;
  }

  productTotal() {
    let coffeeTotal = this.sortedProduct.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
    this.itemTotal = coffeeTotal;
  }
}
