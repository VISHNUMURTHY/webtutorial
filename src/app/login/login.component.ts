import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatCardModule, MatDialogRef } from '@angular/material';

import { Constants } from '../utilities/constants/Constants';

@Component({
  selector: 'web-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class LoginRegisterComponent implements OnInit {

  loginControl = new FormControl();
  loginFlag = true;
  register = 'To get complete access for content';
  login = 'To get latest updates/notifications';
  displayLogin = 'Already Registered User!';
  displayRegister = 'New User? Register Here';

  constructor(private httpClient: HttpClient, private matDialogRef: MatDialogRef<LoginRegisterComponent>) { }

  ngOnInit() {
    
  }


  onSubmit(value){
    this.onClose();
  }

  onClose(){
    this.matDialogRef.close();
  }
}
