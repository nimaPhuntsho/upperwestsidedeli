import { Component, OnInit } from '@angular/core';
import {
  faBuildingShield,
  faAddressCard,
  faPhone,
  faQuestion,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  year: number = 0;
  policy = faBuildingShield;
  about = faAddressCard;
  contact = faPhone;
  faq = faQuestion;
  feedback = faComments;

  ngOnInit() {
    this.getYear();
  }

  getYear() {
    let currentYear = new Date();
    this.year = currentYear.getFullYear();
  }
}
