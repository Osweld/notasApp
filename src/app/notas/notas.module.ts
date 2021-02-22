import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotasRoutingModule } from './notas-routing.module';
import { MateriaComponent } from './pages/materia/materia.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ActividadComponent } from './pages/actividad/actividad.component';
import { SemestreComponent } from './pages/semestre/semestre.component';


@NgModule({
  declarations: [ MateriaComponent, InicioComponent, ActividadComponent, SemestreComponent],
  imports: [
    CommonModule,
    NotasRoutingModule
  ]
})
export class NotasModule { }
