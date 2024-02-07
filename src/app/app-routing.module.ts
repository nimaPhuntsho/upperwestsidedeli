import { LoginComponent } from './components/login/login.component';
import { CancelComponent } from './components/cancel/cancel.component';
import { SuccessComponent } from './components/success/success.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FaqComponent } from './components/faq/faq.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { UsersComponent } from './components/users/users.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { CartComponent } from './components/cart/cart.component';
import { PiesComponent } from './components/pies/pies.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeComponent } from './components/coffee/coffee.component';
import { CroissantComponent } from './components/croissant/croissant.component';
import { DrinksComponent } from './components/drinks/drinks.component';
import { SandwichComponent } from './components/sandwich/sandwich.component';
import { BagelComponent } from './components/bagel/bagel.component';
import { BeerComponent } from './components/beer/beer.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { Auth } from '@angular/fire/auth';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      {
        path: 'coffee',
        component: CoffeeComponent,
      },
      {
        path: 'beer',
        component: BeerComponent,
      },
      {
        path: 'bagel',
        component: BagelComponent,
      },
      {
        path: 'sandwich',
        component: SandwichComponent,
      },
      {
        path: 'drinks',
        component: DrinksComponent,
      },
      {
        path: 'pies',
        component: PiesComponent,
      },
      {
        path: 'croissant',
        component: CroissantComponent,
      },
    ],
  },
  {
    path: 'check-out',
    component: CartComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },

  {
    path: 'user',
    component: UsersComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'cancel',
    component: CancelComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'myadmin',
    // canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
