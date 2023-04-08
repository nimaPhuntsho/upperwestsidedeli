import { FaqComponent } from './components/faq/faq.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
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
    canActivate: [AuthGuardGuard],
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
      {
        path: 'check-out',
        component: CartComponent,
      },
    ],
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
    path: 'login',
    component: LoginComponent,
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
    path: 'myadmin',
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
