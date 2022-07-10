import { ModeloComponent } from './modelo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCoreModule } from '../app-core/app-core.module';
import { CatalogoRoutingModule } from '../catalogo/catalogo-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppResolve } from '../services/app.resolve';
import { AppResolveService } from '../services/app.resolve.service';
import { ModeloService } from './services/modelo.service';
import { HomeComponent } from './home/home.component';
import { ModeloRoutingModule } from './modelo-routing.module';



@NgModule({
  declarations: [
    ModeloComponent,
    HomeComponent,

  ],
  imports: [
    AppCoreModule,
    ModeloRoutingModule,
    ImageCropperModule,

  ],
  providers:[
    ModeloService,
    AppResolve,
    { provide: AppResolveService, useExisting: ModeloService },
  ]
})
export class ModeloModule { }
