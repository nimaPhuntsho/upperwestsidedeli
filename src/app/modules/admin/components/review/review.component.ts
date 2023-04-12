import { Feedback } from './../../../../components/feedback/feedback.component';
import { DataService } from 'src/app/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
  feedback$: Feedback[] = [];
  constructor(private data: DataService<Feedback>) {}

  ngOnInit() {
    this.data.getFeedbacks().then((data) => {
      data?.subscribe((feedback) => {
        this.feedback$ = feedback;
      });
    });
  }
}
