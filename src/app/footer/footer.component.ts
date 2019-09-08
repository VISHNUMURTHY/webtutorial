import { Component, OnInit } from '@angular/core';

import { Constants } from '../utilities/constants/Constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  author:string;
  email: string;
  websiteName: string;

  constructor() { }

  ngOnInit() {
    this.author = Constants.AUTHOR;
	  this.email = Constants.EMAIL;
	  this.websiteName = Constants.WEBSITE_NAME;
  }
  
}
