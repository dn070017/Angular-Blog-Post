import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogin: BehaviorSubject<boolean>;
  public loginUser: User;

  constructor(public router: Router) {
    this.isLogin = new BehaviorSubject(false);
    if(localStorage.getItem('token')){
      this.login(JSON.parse(localStorage.getItem('user')), false);
    } else if(sessionStorage.getItem('token')){
      this.login(JSON.parse(sessionStorage.getItem('user')), false);
    }
  }
  
  public login(user: User, redirect: boolean = true): void {
    this.loginUser = user;
    this.isLogin.next(true);
    if(redirect)
      this.router.navigate([`post/`]);
  }


  public logout(): void {
    this.isLogin.next(false);
    this.loginUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expireAt');
    this.router.navigate(['']);
  }

  public checkIsLogin(): boolean {
    return this.isLogin.getValue();
  }
}
