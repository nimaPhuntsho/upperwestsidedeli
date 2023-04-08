import { Coffee, Product } from './../upload/upload.component';
import { DataService } from 'src/app/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent {
  allCoffee: Coffee[] = [];
  allProducts: Product[] = [];
  setProducts = new Set<Product>();
  serialNumber = 0;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getCoffee().then((coffee) => {
      coffee?.subscribe((element) => {
        this.allCoffee = element;
      });
    });

    this.data.getAllProducts().then((products) => {
      products?.subscribe((element) => {
        this.allProducts = element;
        this.setProducts = new Set(this.allProducts);
        console.log(this.setProducts);
      });
    });
  }

  increment() {
    return this.serialNumber++;
  }
}
