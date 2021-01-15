import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';

import { LoginModule } from '../login/login.module';
import { LoginComponent } from '../login/login/login.component';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    LoginModule
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class PostModule { }
