import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
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

  @ViewChild("userFocus") userFocus: ElementRef;

  loginForm: any;
  forgotForm: any;
  registerForm: any;
  loginFlag = true;
  forgotFlag = false;
  newUser = true;
  usernameSuffix = false;
  hide = false;
  registerMessage = 'To get complete access for content';
  loginMessage = 'To get latest updates/notifications';
  displayLogin = 'Already Registered User!';
  displayRegister = 'New User? Register Here';
  passwordTooltip = 'Password must have minimum 8 characters length & combination of Capital Letter/s, Small Letter/s, Number/s and Special Character/s [!@#$%&*]';

  errorMessages = ValidationMessages.validationErrorMessages;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<LoginRegisterComponent>) {
    this.initializeForms();
  }

  ngOnInit() {
    this.loginForm.get('username').valueChanges.subscribe((value: any) => {
      value === '' ? this.usernameSuffix = false : isNaN(value) ? this.usernameSuffix = false : this.usernameSuffix = true;
    });

    this.registerForm.get('username').valueChanges.subscribe((value: any) => {
      (value === '' || value === null || value === undefined) ? this.usernameSuffix = false : isNaN(value) ? this.usernameSuffix = false : this.usernameSuffix = true;
    });
  }

  initializeForms() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required, UsernameValidator.validUsername
      ])],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*])[A-Za-z0-9!@#$%&*]{8,}$')
      ])]
    });

    this.forgotForm = this.formBuilder.group({
      username: [''],
      otp: ['', Validators.compose([
        Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6)
      ])],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*])[A-Za-z0-9!@#$%&*]{8,}$')
      ])]
    });

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required, UsernameValidator.validUsername
      ])],
      otp: ['', Validators.compose([
        Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6)
      ])],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*])[A-Za-z0-9!@#$%&*]{8,}$')
      ])]
    });
  }

  onSubmit(value) {
    //this.onClose();
  }

  onClose() {
    this.matDialogRef.close();
  }

  login(value) {

  }

  forgotPassword() {
    if (this.loginForm.get('username').hasError('required') || this.loginForm.get('username').hasError('validUsernameEmail') || this.loginForm.get('username').hasError('validUsernameMobile')) {
      this.forgotFlag = false;
      this.userFocus.nativeElement.focus();
    } else {
      this.forgotFlag = true;
      this.hide = false;
      this.forgotForm.controls['username'].setValue(this.loginForm.get('username').value);
      this.forgotForm.controls['username'].disable();
    }
  }

  edit() {
    this.forgotFlag = false;
    this.loginForm.controls['password'].reset();
  }

  resetPassword(value) {

  }

  resendOtp() {

  }

  register() {

  }

  generateOtp() {
    this.newUser = false;
  }

  switch() {
    this.loginFlag = !this.loginFlag;
    this.forgotFlag = false;
    this.newUser = true;
    this.loginForm.reset();
    this.usernameSuffix = false;
    this.forgotForm.reset();
    this.registerForm.reset();
    this.hide = false;
  }

}