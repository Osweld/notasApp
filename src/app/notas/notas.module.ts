import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotasRoutingModule } from './notas-routing.module';
import { MateriaComponent } from './pages/materia/materia.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ActividadComponent } from './pages/actividad/actividad.component';
import { SemestreComponent } from './pages/semestre/semestre.component';
import { SemestreBarComponent } from './components/semestre-bar/semestre-bar.component';
import { MateriaBarComponent } from './components/materia-bar/materia-bar.component';
import { AgregarSemestreComponent } from './components/agregar-semestre/agregar-semestre.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarMateriaComponent } from './components/agregar-materia/agregar-materia.component';
import { ActividadBarComponent } from './components/actividad-bar/actividad-bar.component';
import { ActividadModalComponent } from './components/actividad-modal/actividad-modal.component';
import { ActividadDataComponent } from './components/actividad-data/actividad-data.component';


@NgModule({
  declarations: [ MateriaComponent, InicioComponent, ActividadComponent, SemestreComponent, SemestreBarComponent, MateriaBarComponent, AgregarSemestreComponent, AgregarMateriaComponent, ActividadBarComponent, ActividadModalComponent, ActividadDataComponent],
  imports: [
    CommonModule,
    NotasRoutingModule,
    ReactiveFormsModule
  ]
})
export class NotasModule { }
