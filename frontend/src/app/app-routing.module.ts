import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksListComponent } from './books-list/books-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: BooksListComponent,
  },
  {
    path: 'search/:search-by/:book-search',
    component: BooksListComponent,
  },
  {
    path: 'bookDetails/:isbn',
    component: BookDetailsComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
