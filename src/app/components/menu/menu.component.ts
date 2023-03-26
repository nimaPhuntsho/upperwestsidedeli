import { Component } from '@angular/core';
import { faCoffee, faBeer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  coffee = faCoffee;
  beer = faBeer;
  products = [];
}
