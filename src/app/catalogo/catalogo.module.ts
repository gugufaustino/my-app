import { AppCoreModule } from '../app-core/app-core.module';
import { NgModule } from '@angular/core';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';

import { HomeComponent } from './home/home.component';
import { CatalogoService } from './services/catalogo.service';
import { AppResolve } from '../services/app.resolve';
import { AppResolveService } from '../services/app.resolve.service';

import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [
    CatalogoComponent,
    HomeComponent
  ],
  imports: [
    AppCoreModule,
    CatalogoRoutingModule,
    ImageCropperModule,

  ],
  providers: [
    CatalogoService,
    AppResolve,
    { provide: AppResolveService, useExisting: CatalogoService },
  ]
})
export class CatalogoModule { }
