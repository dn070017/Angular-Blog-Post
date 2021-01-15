import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '../login/login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    LoginModule
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class HomeModule { }
