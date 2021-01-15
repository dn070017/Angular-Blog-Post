import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  
  public isLogin: boolean
  public user: User

  constructor(private auth: AuthService) { 
    this.isLogin = false;
  }

  ngOnInit(): void {
    if(this.auth.checkIsLogin())
      this.isLogin = true;
      this.user = this.auth.loginUser
      this.auth.isLogin.subscribe(res => {
      this.isLogin = res;
    });
  }
}
