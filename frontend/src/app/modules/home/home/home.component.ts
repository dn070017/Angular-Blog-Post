import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { LoginComponent } from '../../login/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public dialogRef: MatDialogRef<any>;

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    if(this.route.snapshot['_routerState'].url == '/login'){
      this.dialogRef = this.dialog.open(LoginComponent, {
        minWidth: "350px",
        minHeight: "300px"
      });
      this.dialogRef.disableClose = true;
    }
  }

  ngOnInit(): void {
  }
}
