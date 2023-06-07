import { AuthGuardGuard } from './../../auth-guard.guard';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ReviewComponent } from './components/review/review.component';
import { FeedbackComponent } from './../../components/feedback/feedback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdateComponent } from './components/update/update.component';
import { UploadComponent } from './components/upload/upload.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'upload',
        component: UploadComponent,
      },
      {
        path: 'update',
        component: UpdateComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'review',
        component: ReviewComponent,
      },
      {
        path: 'analysis',
        component: AnalyticsComponent,
      },
      {
        path: 'adlogin',
        component: AdminloginComponent,
      },
      {
        path: '',
        redirectTo: '/myadmin',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
