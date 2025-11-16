import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckListModule } from 'ng-zorro-antd/check-list';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface Estudiante {
  id: number;
  genero: string;
  codigoRude: string;
  ci: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombre: string;
  turno: string;
  paralelo: string;
  promedioCalculado: number;
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
export default class CandidatosComponent {
  estaConforme = false;
  pageSize = 10;
  searchValue = '';
  currentStep = 1
  listOfData:any = []
  

  listaEstudiantes: Estudiante[] = [
    {
      id: 1,
      genero: 'MAE',
      codigoRude: '',
      ci: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      nombre: '',
      turno: '',
      paralelo: '',
      promedioCalculado: 91.08
    },
    {
      id: 2,
      genero: 'FEM',
      codigoRude: '',
      ci: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      nombre: '',
      turno: '',
      paralelo: '',
      promedioCalculado: 97.25
    }
  ];

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

  onRevisarCalculo(estudiante: Estudiante): void {
    // Lógica para revisar el cálculo del promedio
    console.log(`Revisando cálculo para estudiante ${estudiante.id}`);
    // Aquí iría la lógica para revisar el cálculo
  }
}