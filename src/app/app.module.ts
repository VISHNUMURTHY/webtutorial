import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { LoginRegisterComponent } from './login/login.component';
import { BlockCopyPasteDirective } from './directives/block-copy-paste.directive';
import {EllipsisDirective} from './directives/ellipsis';
import { ElectricalComponentsComponent } from './electrical-components/electrical-components.component';
import { SearchComponent } from './search/search.component';

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
    ContactUsDetailsComponent,
    LoginRegisterComponent,
    BlockCopyPasteDirective,
    EllipsisDirective,
    ElectricalComponentsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
	  ReactiveFormsModule,
	  HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  entryComponents: [ContactUsDetailsComponent, LoginRegisterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
