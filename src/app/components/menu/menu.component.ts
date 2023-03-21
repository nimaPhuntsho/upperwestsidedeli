import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  products = [
    {
      name: 'Mocha',
      productID: 1,
      price: 5.5,
      description:
        'A mocha coffee comfortably takes its place in the crossroads between a coffee and  ',
    },
    {
      name: 'Mocha',
      productID: 1,
      price: 5.5,
      description:
        'A mocha coffee comfortably takes its place in the crossr white chocolate. ',
    },
    {
      name: 'Mocha',
      productID: 1,
      price: 5.5,
      description:
        'A mocha coffee comfortably takes its place in the crossrocolate. ',
    },
    {
      name: 'Mocha',
      productID: 1,
      price: 5.5,
      description: 'A mocha coffee comfortably takes its place in the crate. ',
    },
    {
      name: 'Mocha',
      productID: 1,
      price: 5.5,
      description:
        'A mocha coffee comfortably takes its place in the croscolate. ',
    },
  ];
}
