import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { debounceTime, tap, switchMap, finalize }  from 'rxjs/operators';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Constants } from '../utilities/constants/Constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
	myControl = new FormControl();
  options: string[] = Constants.SEARCH_KEYS;
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length <1 ?[]:this._filter(value).length>0?this._filter(value):["No Results Found"])
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
