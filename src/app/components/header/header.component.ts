import { Product } from './../../modules/admin/components/upload/upload.component';
import { DataService } from 'src/app/data.service';
import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {
  faHouseChimney,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  close = false;
  hamburger = true;
  show = false;
  closeAnimation = false;
  home = faHouseChimney;
  location = faLocationDot;
  constructor() {}

  ngOnInit() {}

  toggle() {
    this.close = !this.close;
    this.hamburger = !this.hamburger;
    this.show = !this.show;
  }

  clear() {
    this.show = false;
    this.close = false;
    this.hamburger = true;
  }
}
