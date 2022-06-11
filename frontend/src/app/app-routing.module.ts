import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksListComponent } from './books-list/books-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PointsTradingComponent } from './points-trading/points-trading.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  { path: '', component: BooksListComponent },
  { path: 'search/:search-by/:book-search', component: BooksListComponent },
  { path: 'bookDetails/:isbn', component: BookDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService] },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'points', component: PointsTradingComponent, canActivate: [AuthGuardService] },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' }
]; 

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
