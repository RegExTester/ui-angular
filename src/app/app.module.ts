import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TextInputHighlightModule } from 'angular-text-input-highlight';

import { AppComponent } from './app.component';
import { RegexComponent } from './regex/regex.component';

import { AppRoutingModule } from './app.routing';
import { RegexRoutingModule } from './regex/regex.routing';



@NgModule({
  declarations: [
    AppComponent,
    RegexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TextInputHighlightModule,

    RegexRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
