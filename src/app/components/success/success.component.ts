import { Product } from './../../modules/admin/components/upload/upload.component';
import { DataService } from 'src/app/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent {
  constructor(private data: DataService<Product>) {}
  ngOnInit() {
    this.data.currentSale.subscribe((data) => {
      console.log(data);
    });
  }
}
