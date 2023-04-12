import { DataService } from 'src/app/data.service';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

export interface Feedback {
  name: string;
  comment: string;
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
  constructor(private data: DataService<Feedback>) {}

  postFeedbacks(form: NgForm) {
    let feedback: Feedback = {
      name: this.name$,
      comment: this.comment$,
    };
    this.data.sendFeedback(feedback);
    form.reset();
    this.isSuccess = true;
  }
}
