import { DataService } from 'src/app/data.service';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  FieldValue,
  serverTimestamp,
  Timestamp,
} from '@angular/fire/firestore';

export interface Feedback {
  name: string;
  comment: string;
  date: string;
}

export interface FeedbackID extends Feedback {
  id: string;
  isPosted: boolean;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  name$ = '';
  comment$ = '';
  isSuccess = false;
  feedback$: FeedbackID[] = [];
  showForm = false;
  hideBtn = true;
  hideFeedbacks = true;
  constructor(private data: DataService<Feedback>) {}

  ngOnInit() {
    this.data.getFeedbacks().then((data) => {
      data?.subscribe((feedback) => {
        feedback.forEach((element) => {
          if (element.isPosted) {
            this.feedback$.push(element);
          }
        });
      });
    });
  }

  postFeedbacks(form: NgForm) {
    let feedback: Feedback = {
      name: this.name$,
      comment: this.comment$,
      date: Timestamp.now().toDate().toDateString(),
    };
    this.data.sendFeedback(feedback);
    form.reset();
    this.isSuccess = true;
    this.showForm = false;
    this.hideBtn = true;
    this.hideFeedbacks = true;
  }

  feedbackForm() {
    this.showForm = true;
    this.hideBtn = false;
    this.hideFeedbacks = false;
  }
}
