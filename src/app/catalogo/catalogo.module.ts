import { AppCoreModule } from '../app-core/app-core.module';
import { NgModule } from '@angular/core';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';

import { HomeComponent } from './home/home.component';
import { InserirComponent } from './inserir/inserir.component';
import { EditarComponent } from './editar/editar.component';
import { LabelComponent } from '../app-core/components/label.component/label.component';
import { CatalogoService } from './services/catalogo.service';
import { AppResolve } from '../services/app.resolve';
import { AppResolveService } from '../services/app.resolve.service';

import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [
    CatalogoComponent,
    HomeComponent,
    InserirComponent,
    EditarComponent, LabelComponent
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
