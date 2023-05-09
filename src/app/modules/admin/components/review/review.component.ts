import { faL } from '@fortawesome/free-solid-svg-icons';
import {
  Feedback,
  FeedbackID,
} from './../../../../components/feedback/feedback.component';
import { DataService } from 'src/app/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
  feedback$: FeedbackID[] = [];
  selectedFeedback: FeedbackID | undefined;
  isPosted = false;
  isDeleted = false;
  constructor(private data: DataService<Feedback>) {}

  ngOnInit() {
    this.data.getFeedbacks().then((data) => {
      data?.subscribe((feedback) => {
        this.feedback$ = feedback;
      });
    });
  }

  delete(feedback: FeedbackID) {
    this.selectedFeedback = feedback;
    if (confirm('Are you sure you want to delete this post?')) {
      this.data.deleteFeedback(feedback.id);
      this.isDeleted = true;
    }

    setTimeout(() => {
      this.isDeleted = false;
    }, 2000);
  }

  post(feedback: FeedbackID) {
    this.selectedFeedback = feedback;
    if (confirm('Are you sure you want to post this feedback?')) {
      this.data.postFeedback(feedback.id);
      this.isPosted = true;
    }

    setTimeout(() => {
      this.isPosted = false;
    }, 2000);
  }
}
