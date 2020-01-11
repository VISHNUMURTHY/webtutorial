import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatCardModule, MatDialogRef } from '@angular/material';
import { ValidationMessages, UsernameValidator } from './validations/login.validations';

import { Constants } from '../utilities/constants/Constants';

@Component({
  selector: 'web-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class LoginRegisterComponent implements OnInit {

  @ViewChild("userFocus", { static: false }) userFocus: ElementRef;

  loginForm;
  forgotForm;
  loginFlag = true;
  forgotFlag = false;
  newUser = true;
  usernameSuffix = false;
  registerMessage = 'To get complete access for content';
  loginMessage = 'To get latest updates/notifications';
  displayLogin = 'Already Registered User!';
  displayRegister = 'New User? Register Here';

  loginMessages = ValidationMessages.login_validation_messages;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<LoginRegisterComponent>) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required, UsernameValidator.validUsername
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
    this.loginForm.get('username').valueChanges.subscribe(value => {
      value === '' ? this.usernameSuffix = false : isNaN(value) ? this.usernameSuffix = false : this.usernameSuffix = true;
    });
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
    if (this.loginForm.get('username').hasError('required') || this.loginForm.get('username').hasError('validUsernameEmail') || this.loginForm.get('username').hasError('validUsernameMobile')) {
      this.forgotFlag = false;
      this.userFocus.nativeElement.focus();
    } else {
      this.forgotFlag = true;
      this.forgotForm.controls['username'].setValue(this.loginForm.get('username').value);
      this.forgotForm.controls['username'].disable();
    }
  }

  edit() {
    this.forgotFlag = false;
    this.loginForm.controls['password'].reset();
  }

  resetPassword(value) {
    console.log(value);
    console.log(this.forgotForm);
  }

  validateRegisterUser(username) {
    console.log(username);
  }

  register() {

  }

}
