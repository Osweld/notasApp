import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { SemestreService } from '../../services/semestre.service';
import { NotasService } from '../../services/notas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cycle, Year } from '../../interfaces/notas.interface';
import { ModalsService } from '../../services/modals.service';
import { CreateSemester } from '../../interfaces/utils.interface';

@Component({
  selector: 'app-agregar-semestre',
  templateUrl: './agregar-semestre.component.html',
  styleUrls: ['./agregar-semestre.component.css']
})
export class AgregarSemestreComponent implements OnInit, DoCheck {

  activeCreateSemester:boolean = false;
  message:string = 'No se pudo crear el semestre';
  showMesage:boolean = false;
  loading:boolean = false;

  
  cycles: Cycle[] = [];
  years: Year[] = [];
  createSemester!:CreateSemester;

  myForm: FormGroup = this.fb.group({
    cycle: ['', [Validators.required]],
    year: ['', [Validators.required]],
  });

  constructor(private semestreService: SemestreService, private notasService: NotasService,
     private fb: FormBuilder,private modalsService:ModalsService) { }
  ngDoCheck(): void {
    this.activeCreateSemester = this.modalsService.getCreateSemester();
  }

  ngOnInit(): void {
    this.notasService.getCycles().subscribe(resp => { this.cycles = resp.cycle });
    this.notasService.getYear().subscribe(resp => { this.years = resp.year });
  }

  ValidatorsForm(control:string){
    return this.myForm.get(control)?.errors && this.myForm.get(control)?.touched
  }



  selectSemester() {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
    }
    this.loading = true;
    this.showMesage = false;


    this.createSemester = this.myForm.value;
    this.semestreService.saveSemester(this.createSemester)
    .subscribe( resp =>{
      this.loading = false;
      this.semestreService.setRefreshSemester(true);
      this.modalsService.setCreateSemester(false);
      this.myForm.reset({
        cycle:"",
        year:""
      });
    },error =>{
      this.loading = false;
      console.log(error);
    this.showMesage = true;
    })
  }

  close(){
   this.modalsService.setCreateSemester(false);
  }

}
