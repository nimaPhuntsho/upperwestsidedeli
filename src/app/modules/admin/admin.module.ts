import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { UploadComponent } from './components/upload/upload.component';
import { UpdateComponent } from './components/update/update.component';
import { HeaderComponent } from './components/header/header.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    OrdersComponent,
    UploadComponent,
    UpdateComponent,
    HeaderComponent,
    PagenotfoundComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
