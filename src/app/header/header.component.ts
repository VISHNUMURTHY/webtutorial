import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Constants } from '../utilities/constants/Constants';
import { LoginRegisterComponent } from '../login/login.component';

@Component({
  selector: 'web-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class HeaderComponent implements OnInit {

  searchControl = new FormControl();
  options: string[];
  noResult: boolean;
  filteredOptions: Observable<string[]>;

  constructor(private httpClient: HttpClient, private matDialog: MatDialog) {
    this.options = Constants.SEARCH_KEYS;
    this.noResult = false;
  }

  ngOnInit() {

    this.filteredOptions = this.searchControl.valueChanges.pipe(
      map(value => value.length < 1 ? this.noResults(value) : this._filter(value).length > 0 ? this._filter(value) : this.noResults(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.noResult = false;
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  noResults(val: any) {
    if (val === '' || val === null || val === undefined) {
      this.noResult = false;
    } else {
      this.noResult = true;
    }
    return [];
  }

  selectedOption(value) {
    console.log(value);
  }

  loginResigter() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '50%';
    dialogConfig.height = '65%';
    dialogConfig.closeOnNavigation = true;
    this.matDialog.open(LoginRegisterComponent, dialogConfig);
  }

  searchReset() {
    this.searchControl.reset();
  }
}