import { AuthGuard } from './app-core/services/auth.guard';
import { Injector, LOCALE_ID, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'


import { NgBrazil } from 'ng-brazil'
import { TextMaskModule } from 'angular2-text-mask'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation'
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacaoModule } from './navegacao/navegacao.module';

import { ErrorInterceptor } from './services/error.handler.service';
import { ToastAppService } from './services/toastapp.service';
import { ContasAPagarGuard } from './contas-a-pagar/services/contas-a-pagar.guard';
import { FornecedorGuard } from './fornecedores/services/fornecedor.guard';
import { CatalogoGuard } from './catalogo/services/catalogo.guard';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { SettingsService } from './services/settings.service';
import { ModeloGuard } from './modelo/services/modelo.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { LocalStorageUtils } from './app-core/utils/localstorage';
registerLocaleData(localePt);

export let AppInjector: Injector;
export const appProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: LOCALE_ID, deps: [SettingsService], useFactory: (settingsService: any) => settingsService.getLocale() }
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NavegacaoModule,
    NgBrazil,
    TextMaskModule,
    CustomFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ // ToastrModule added
      positionClass: 'toast-center-center'
    }),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => { return localStorage.getItem('accessToken') },
      }
    })
  ],
  providers: [
    appProviders,
    ToastAppService,

    ContasAPagarGuard,
    FornecedorGuard,
    CatalogoGuard,
    ModeloGuard,
    AuthGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  constructor(private injector : Injector) {
    AppInjector = this.injector;
  }
  ngOnInit(): void {

  }
}
