import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  year: number = 0;

  ngOnInit() {
    this.getYear();
  }

  getYear() {
    let currentYear = new Date();
    this.year = currentYear.getFullYear();
  }
}
