import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksListComponent } from './books-list/books-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
//import { LoginComponent } from './login';

const routes: Routes = [
  { path: '', component: BooksListComponent },
  { path: 'search/:search-by/:book-search', component: BooksListComponent },
  { path: 'bookDetails/:isbn', component: BookDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: UserProfileComponent },
  { path: '', component: BooksListComponent, canActivate: [AuthGuardService] },
  //{ path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
]; 

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
