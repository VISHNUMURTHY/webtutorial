import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HtmlComponent } from './html/html.component';  
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SectionComponent } from './section/section.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContactUsDetailsComponent } from './contact-us-details/contact-us-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SectionComponent,
    HtmlComponent,
    SearchFilterPipe,
    ContactUsComponent,
    HomeComponent,
    NavigationComponent,
    ContactUsDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  entryComponents: [ContactUsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
