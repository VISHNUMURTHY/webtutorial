import { Component, OnInit } from '@angular/core';

import { SearchFilterPipe } from '../pipes/search-filter.pipe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  providers: [ SearchFilterPipe ]
})
export class HeaderComponent implements OnInit {
  searchKeys = ['MDB', 'Angular'];
  
  constructor(private search: SearchFilterPipe) { }

  ngOnInit() {

  }

}
