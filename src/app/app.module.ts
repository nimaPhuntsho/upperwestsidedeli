import { AdminRoutingModule } from './modules/admin/admin-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AdminModule } from './modules/admin/admin.module';
import { FormsModule } from '@angular/forms';
import { CoffeeComponent } from './components/coffee/coffee.component';
import { BeerComponent } from './components/beer/beer.component';
import { BagelComponent } from './components/bagel/bagel.component';
import { SandwichComponent } from './components/sandwich/sandwich.component';
import { DrinksComponent } from './components/drinks/drinks.component';
import { PiesComponent } from './components/pies/pies.component';
import { CroissantComponent } from './components/croissant/croissant.component';
import { MatSelectModule } from '@angular/material/select';
import { CartComponent } from './components/cart/cart.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  provideFirestore,
  getFirestore,
  Firestore,
} from '@angular/fire/firestore';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { LoginComponent } from './components/login/login.component';
import { firebase, FirebaseUIModule } from 'firebaseui-angular';
import * as firebaseui from 'firebaseui';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { UsersComponent } from './components/users/users.component';
import { FaqComponent } from './components/faq/faq.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { SuccessComponent } from './components/success/success.component';
import { CancelComponent } from './components/cancel/cancel.component';
import { NgxStripeModule } from 'ngx-stripe';
import { DialogComponent } from './dialog/dialog.component';
import { CheckoutDialogComponent } from './checkout-dialog/checkout-dialog.component';
import { PaymentService } from './payment.service';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { OrderCompleteDialogComponent } from './order-complete-dialog/order-complete-dialog.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInSuccessUrl: 'login',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: ['public_profile', 'email', 'user_likes', 'user_friends'],
      customParameters: {
        auth_type: 'reauthenticate',
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    },
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // {
    //   requireDisplayName: false,
    //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ContactComponent,
    AboutComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    CoffeeComponent,
    BeerComponent,
    BagelComponent,
    SandwichComponent,
    DrinksComponent,
    PiesComponent,
    CroissantComponent,
    CartComponent,
    PrivacyComponent,
    LoginComponent,
    UsersComponent,
    FaqComponent,
    FeedbackComponent,
    CartIconComponent,
    SuccessComponent,
    CancelComponent,
    DialogComponent,
    CheckoutDialogComponent,
    FeedbackDialogComponent,
    OrderCompleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatCardModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AdminModule,
    FormsModule,
    MatSelectModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    MatDialogModule,
    NgxStripeModule.forRoot(
      'pk_test_51N0G96FlNzy8IbvjunvKZF4ROTRMlvRIBSRvuQGKQfYNAYdodzUxuyAOIyX8cgPwBRI0dOMPnmY5blJJw0J7tiM400nKIpSXeN'
    ),
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
