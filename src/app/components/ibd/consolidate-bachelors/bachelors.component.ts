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

  isSatisfied = false;

  ngOnInit(): void {
    const { institutionInfo } = this.appStore.snapshot
    const currentYear = APP_CONSTANTS.CURRENT_YEAR
    this.bachelorsService.getBachelors(currentYear, institutionInfo.id).subscribe((response) => {
      this.bachelors = response.data
    })
  }


  pageSize = 10;
  searchValue = '';
  currentStep = 1


  consolidateBechelors(): void {
    if(this.isSatisfied) {

    }
  }

  checkCalculation(student: Bachelor): void {
    const { institutionInfo, user } = this.appStore.snapshot;
    const fullName = `${user.person.name} ${user.person.lastName} ${user.person.mothersLastName}`
    const currentYear = APP_CONSTANTS.CURRENT_YEAR;
    this.bachelorsService.reportBechelors(
      currentYear,
      institutionInfo.id,
      student.genero,
      fullName,
      user.person.identityCard
    ).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte-bachiller.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al generar el reporte', err);
      }
    });
  }

}