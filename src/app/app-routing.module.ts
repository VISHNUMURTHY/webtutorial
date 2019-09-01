import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HtmlComponent } from './html/html.component';
import { enableDebugTools } from '@angular/platform-browser';

const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: 'contactUs' , component: ContactUsComponent},
  {path: 'html' , component: HtmlComponent},
  { path: '',  redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {enableTracing:true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
