import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user';
import { Config } from 'src/app/shared/configs/config';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    
    this.auth.isLogin.subscribe(res => {
      if (res)
        this.dialogRef.close();
    });
    this.auth.isLogin.subscribe(res => {
      if (res)
        this.dialogRef.close();
    });
    
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      remember: new FormControl(false)
    });
  }

  private requestLogin(): Observable<Object>{
    let username = this.loginForm.controls.username.value;
    let password = this.loginForm.controls.password.value;
    return this.http.post(`/api/login?username=${username}&password=${password}`, {});
	}

  public forgetPassword(): void {
    this.dialogRef.close();
  }

  public login(): void {
    if(!this.loginForm.valid){
      this.snackBar.open('Please enter username and password', 'Retry', { 
        panelClass: 'mat-snackbar',
        duration: 2000, 
        verticalPosition: 'top'
      });
      return
    }
    this.requestLogin().pipe(take(1)).subscribe(
      (res: any) => {
        //const expiresAt = moment().add(res.expiresIn, 'second');
        let user = new User(res.user);
        if(this.loginForm.controls.remember.value){
          localStorage.setItem('token', res.token)
          localStorage.setItem("user", JSON.stringify(user))
        } else {
          sessionStorage.setItem('token', res.token)
          sessionStorage.setItem("user", JSON.stringify(user))
        }
        this.auth.login(user);
        this.dialogRef.close();
      },
      (err: any) => {
        if(err.status == 504){
          this.snackBar.open('Backend server is not responding', 'Retry', Config.SNACKBAR_SETTING)
        } else {
          this.snackBar.open(err.error.message, 'Retry', Config.SNACKBAR_SETTING)
        }
      }
    )
  }
}
