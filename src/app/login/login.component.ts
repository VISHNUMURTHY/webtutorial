import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatCardModule, MatDialogRef } from '@angular/material';
import { ValidationMessages } from './validations/login.validations';

import { Constants } from '../utilities/constants/Constants';

@Component({
  selector: 'web-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class LoginRegisterComponent implements OnInit {
  loginForm;
  forgotForm;
  loginFlag = true;
  forgotFlag =false;
  newUser = true;
  registerMessage = 'To get complete access for content';
  loginMessage = 'To get latest updates/notifications';
  displayLogin = 'Already Registered User!';
  displayRegister = 'New User? Register Here';

  loginMessages = ValidationMessages.login_validation_messages;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<LoginRegisterComponent>) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')
      ])],
      password: ['', Validators.required]
    });

    this.forgotForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')
      ])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }


  onSubmit(value) {
    //this.onClose();
  }

  onClose() {
    this.matDialogRef.close();
  }

  login(value) {
    console.log(value);
    console.log(this.loginForm);
  }

  forgotPassword() {
    this.forgotFlag=true;
  }

  resetPassword(value){
    console.log(value); 
    console.log(this.forgotForm);
  }

  validateRegisterUser(username){
    console.log(username);
  }

  register(value){

  }

}
