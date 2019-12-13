import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

import { Constants } from '../utilities/constants/Constants';

@Component({
  selector: 'web-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginControl = new FormControl();
  searchValue: string;
  options: string[];
  noResult: boolean;
  filteredOptions: Observable<string[]>;

  constructor(private httpClient: HttpClient, private matDialogRef: MatDialogRef<LoginComponent>) {
    this.options = Constants.SEARCH_KEYS;
    this.noResult = false;
  }

  ngOnInit() {

    this.filteredOptions = this.loginControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length < 1 ? [] : this._filter(value).length > 0 ? this._filter(value) : [])
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectedOption(value) {
    console.log(value);
  }

  onSubmit(value){
    console.log(value);
    this.onClose();
  }

  onClose(){
    this.matDialogRef.close();
  }
}
