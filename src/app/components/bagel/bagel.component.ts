import { DataService } from 'src/app/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bagel',
  templateUrl: './bagel.component.html',
  styleUrls: ['./bagel.component.css'],
})
export class BagelComponent {
  constructor(private data: DataService) {}
  ngOnInit() {
    this.data.getProducts('products', 'Bagel').then((bagels) => {
      bagels?.subscribe((item) => {
        console.log(item);
      });
    });
  }
}
