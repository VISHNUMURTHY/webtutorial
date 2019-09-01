import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.less']
})
export class ContactUsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.contact();
  }

  contact(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus =  true;
    dialogConfig.width = "60%";
    this.dialog.open(ContactUsComponent, dialogConfig);
  }
}
