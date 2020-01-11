import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'web-electrical-components',
  templateUrl: './electrical-components.component.html',
  styleUrls: ['./electrical-components.component.less'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class ElectricalComponentsComponent implements OnInit {
  resistanceForm;
  
  constructor() { }

  ngOnInit() {
  }

  resistance(value){
    
  }
}
