import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { BachelorsService } from '../../../services/apis/bachelors.service';
import { AppStore } from '../../../store/app.store';
import { APP_CONSTANTS } from '../../../constants/constants';

interface Bachelor {
  genero: string;
  codigo_rude: string;
  carnet_identidad: string;
  complemento: string;
  paterno: string;
  materno: string;
  nombre: string;
  turno: string;
  paralelo: string;
  nota_cuant_prom: string;
}

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzTableModule,
    NzRadioModule,
    NzCheckboxModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzStepsModule,
    NzCardModule
  ],
  selector: 'app-candidatos',
  templateUrl: './bachelors.component.html',
  styleUrls: ['./bachelors.component.less']
})
export default class BachelorsComponent implements OnInit {

  bachelors: Array<Bachelor> = []
  bachelorsService = inject(BachelorsService)
  appStore = inject(AppStore)


  ngOnInit(): void {
    const { institutionInfo } = this.appStore.snapshot
    const currentYear = APP_CONSTANTS.CURRENT_YEAR
    this.bachelorsService.getBachelors(currentYear, institutionInfo.id).subscribe((response) => {
      this.bachelors = response.data
    })
  }


  estaConforme = false;
  pageSize = 10;
  searchValue = '';
  currentStep = 1


  onRegistrarEstudiantes(): void {
    if (this.estaConforme) {
      // Lógica para registrar estudiantes e imprimir DDJJ
      console.log('Registrando estudiantes e imprimiendo DDJJ...');
      // Aquí iría la lógica para registrar e imprimir
    } else {
      // Mostrar mensaje de que debe marcar la conformidad primero
      console.log('Debe marcar la casilla de conformidad primero');
    }
  }

  onRevisarCalculo(estudiante: Bachelor): void {
    // Lógica para revisar el cálculo del promedio
    // console.log(`Revisando cálculo para estudiante ${estudiante.id}`);
    // Aquí iría la lógica para revisar el cálculo
  }
}