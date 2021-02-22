import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MateriaComponent } from './pages/materia/materia.component';
import { ActividadComponent } from './pages/actividad/actividad.component';
import { SemestreComponent } from './pages/semestre/semestre.component';

const routes: Routes = [
  {
    path:'',
    component:InicioComponent,
    children:[
      {path:'inicio',component:SemestreComponent},
      {path:'materia',component:MateriaComponent},
      {path:'actividad',component:ActividadComponent},
      {path:'**',redirectTo:'inicio'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotasRoutingModule { }
