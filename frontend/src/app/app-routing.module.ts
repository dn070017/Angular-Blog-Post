import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';
import { PostComponent } from './modules/post/post/post.component';

const routes: Routes = [
  {
    path: '', 
    component: PostComponent,
    //canActivate: [LoginGuard]  
  },
  {
    path: 'login', 
    component: HomeComponent,
    //canActivate: [LoginGuard]  
  },
  {
    path: 'post',
    component: PostComponent
  },
  { 
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
