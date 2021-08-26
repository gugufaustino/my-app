import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NgBrazil } from 'ng-brazil'
import { TextMaskModule } from 'angular2-text-mask'
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavegacaoModule,
    NgbModule,
    NgBrazil,
    TextMaskModule,
    CustomFormsModule,
    NgbAlertModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ // ToastrModule added    
      positionClass: 'toast-top-center'
    }), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
 
export class AppModule { }
