import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, TemplateRef } from '@angular/core';
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
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzListModule } from 'ng-zorro-antd/list';

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
    NzCardModule,
    NzAlertModule,
    NzModalModule,
    NzListModule
  ],
  selector: 'app-candidatos',
  templateUrl: './bachelors.component.html',
  styleUrls: ['./bachelors.component.less']
})
export default class BachelorsComponent implements OnInit {

  bachelors: Array<Bachelor> = []
  bachelorsService = inject(BachelorsService)
  appStore = inject(AppStore)
  message = inject(NzMessageService)

  isSatisfied = false;
  loadingFeminine: boolean = false
  loadingMasculine: boolean = false
  loadingConsolidate: boolean = false
  loadingData: boolean = false

  error: string = ''

  institutionTypeId: number | null = null

  modal = inject(NzModalService)
  dialog = `IMPORTANTE: Al realizar esta acción se establece a ambos estudiantes como bachilleres
  destacados en ${2025}`

  isSeeVisibleDialog: boolean = false
  institutionInfo: any = undefined

  ngOnInit(): void {
    this.loadingData = true
    const { institutionInfo } = this.appStore.snapshot
    this.institutionInfo = institutionInfo
    const currentYear = APP_CONSTANTS.CURRENT_YEAR
    this.institutionTypeId = institutionInfo.type
    switch(institutionInfo.type) {
      case 1: // REGULAR
        this.bachelorsService.getBachelorsRegular(currentYear, institutionInfo.id).subscribe((response) => {
          this.bachelors = response.data
          this.loadingData = false
        })
        break;
      case 2: // ALTERNATIVA
        this.bachelorsService.getBachelorsAlternative(currentYear, institutionInfo.id).subscribe((response) => {
          this.bachelors = response.data
          this.loadingData = false
        })
        break;
      default:
        this.loadingData = false
    }
  }


  pageSize = 10;
  // searchValue = '';
  // currentStep = 1

  openDialog(tpl: TemplateRef<{}>) {
    this.isSeeVisibleDialog = true
    // this.modal.confirm({
    //   nzTitle: 'Consolidar a los estudiantes',
    //   nzContent: tpl,
    //   nzOkText: 'Consolidar',
    //   nzCancelText: 'Cancelar',
    //   nzWidth: 500,
    //   nzOkLoading: this.loadingConsolidate,
    //   nzOnOk: () => this.consolidateBechelors()
    // })
  }

  handleCancel() {
    this.isSeeVisibleDialog = false
    this.loadingConsolidate = false
  }

  consolidateBechelors(): void {
    this.loadingConsolidate = true
    const { institutionInfo, user } = this.appStore.snapshot;
    console.log("user", user)
    const currentYear = APP_CONSTANTS.CURRENT_YEAR;
    if(this.isSatisfied) {
      switch(this.institutionTypeId) {
        case 1: // REGULAR
          this.bachelorsService.consolidateRegular(currentYear, institutionInfo.id, user.userId, 1)
            .subscribe({
              next: (response) => {
                this.handleDownload(response.body!, currentYear.toString(), institutionInfo.id)
                this.loadingConsolidate = false
              },
              error: (err) => {
                this.error = 'Error al generar el reporte',
                this.loadingConsolidate = false
                console.log('Error: ', err)
              }
            })
          break;
        case 2: // ALTERNATIVA
          this.bachelorsService.consolidateAlternative(currentYear, institutionInfo.id, user.userId, 1)
            .subscribe({
              next: (response) => {
                this.handleDownload(response.body!, currentYear.toString(), institutionInfo.id)
                this.loadingConsolidate = false
              },
              error: (err) => {
                this.error = 'Error al generar el reporte',
                this.loadingConsolidate = false
                console.log('Error: ', err)
              }
            })
          break;
        default:
          this.loadingConsolidate = false
      }
    }
  }

  checkCalculation(genere: string): void {
    const { institutionInfo } = this.appStore.snapshot;
    const currentYear = APP_CONSTANTS.CURRENT_YEAR;

    switch(this.institutionTypeId) {
      case 1: // REGULAR
        console.log("regular")
        if(genere === 'MASCULINO') {
          this.loadingMasculine = true
          console.log("masculino")
          this.bachelorsService.getReportGeneralMasculineRegular(
            currentYear,
            institutionInfo.id,
          ).subscribe({
            next: (response) => {
              const contentType = response.headers.get('Content-Type')
              if(contentType?.includes('application/pdf')) {
                this.handleDownload(response.body!, currentYear.toString(), institutionInfo.id)
              } else {
                const reader = new FileReader();
                reader.onload = () => {
                  const json = JSON.parse(reader.result as string);
                  if(!json.success) {
                    this.message.warning(json.message)
                  }
                };
                if (!response.body) {
                  this.message.error('La respuesta está vacía.');
                  return;
                }
                reader.readAsText(response.body)
              }
              this.loadingMasculine = false
            },
            error: (err) => {
              this.error = 'Error al generar el reporte',
              this.loadingMasculine = false
              console.log('Error: ', err)
            }
          });
        } else if(genere === 'FEMENINO') {
          this.loadingFeminine = true
          this.bachelorsService.getReportGeneralFeminineRegular(
            currentYear,
            institutionInfo.id,
          ).subscribe({
            next: (response) => {
              this.handleDownload(response.body!, currentYear.toString(), institutionInfo.id)
              this.loadingFeminine = false
            },
            error: (err) => {
              this.error = 'Error al generar el reporte',
              this.loadingFeminine = false
              console.log('Error: ', err)
            }
          });
        }
        break;
      case 2: // ALTERNATIVA
      if(genere === 'MASCULINO') {
        this.loadingMasculine = true
        this.bachelorsService.getReportGeneralMasculineAlternative(
          currentYear,
          institutionInfo.id,
        ).subscribe({
          next: (response) => {
            this.handleDownload(response.body!, currentYear.toString(), institutionInfo.id)
            this.loadingMasculine = false
          },
          error: (err) => {
            this.error = 'Error al generar el reporte',
            this.loadingMasculine = false
            console.log('Error: ', err)
          }
        });
      } else if(genere === 'FEMENINO') {
        this.loadingFeminine = true
        this.bachelorsService.getReportGeneralFeminineAlternative(
          currentYear,
          institutionInfo.id,
        ).subscribe({
          next: (response) => {
            this.handleDownload(response.body!, currentYear.toString(), institutionInfo.id)
            this.loadingFeminine = false
          },
          error: (err) => {
            this.error = 'Error al generar el reporte',
            this.loadingFeminine = false
            console.log('Error: ', err)
          }
        });
      }
      break;
      default:
        this.loadingMasculine = false
        this.loadingFeminine = false
    }
  }

  private handleDownload(blob: Blob, gestionId: string, sie: string) {
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a')
    link.href = blobUrl;
    link.download = `reporte_femenio_${sie}_${gestionId}.pdf`

    document.body.appendChild(link)
    link.click();

    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  }

}