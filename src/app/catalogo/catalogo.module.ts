import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

import { HomeComponent } from './home/home.component';
import { InserirComponent } from './inserir/inserir.component';
import { EditarComponent } from './editar/editar.component';
import { LabelComponent } from '../app-core/components/label.component/label.component';


@NgModule({
  declarations: [
    CatalogoComponent,
    HomeComponent,
    InserirComponent,
    EditarComponent, LabelComponent
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,

    RouterModule,
    NgbModule,

    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
  ]
})
export class CatalogoModule { }
