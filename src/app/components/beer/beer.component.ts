import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css'],
})
export class BeerComponent {
  constructor(private data: DataService) {}
  ngOnInit() {
    this.data.getProducts('products', 'Beer').then((beer) => {
      beer?.subscribe((item) => {
        console.log(item);
      });
    });
  }
}
