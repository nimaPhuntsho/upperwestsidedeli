import { FeedbackDialogComponent } from './../../feedback-dialog/feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  FieldValue,
  serverTimestamp,
  Timestamp,
} from '@angular/fire/firestore';
import { async } from '@firebase/util';

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
  sortedFeedback: FeedbackID[] = [];
  showForm = false;
  hideBtn = true;
  hideFeedbacks = true;
  constructor(private data: DataService<Feedback>, private dialog: MatDialog) {}

  ngOnInit() {
    this.data.getFeedbacks().then((data) => {
      data?.subscribe((feedback) => {
        this.feedback$ = feedback;
      });
    });
  }

  postFeedbacks(form: NgForm) {
    let dialogRef = this.dialog.open(FeedbackDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
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
        this.clear();
      }
    });
  }

  feedbackForm() {
    this.showForm = true;
    this.hideBtn = false;
    this.hideFeedbacks = false;
  }

  async filterPost(feedbacks: FeedbackID[]) {
    await feedbacks.filter((element) => {
      if (element.isPosted) {
        this.sortedFeedback.push(element);
      }
    });
  }

  clear() {
    setTimeout(() => {
      this.isSuccess = false;
    }, 2200);
  }
}
