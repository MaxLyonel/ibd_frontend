import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';

interface MenuItem {
  label: string;
  icon: string;
  link?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-registro',
  imports : [
    CommonModule,
    FormsModule,
    NzAlertModule,
    NzCardModule,
    NzDescriptionsModule,
    NzFormModule,
    NzSelectModule,
    NzDividerModule,
    NzLayoutModule,
    NzModalModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzDatePickerModule,
    NzIconModule,
    NzDropDownModule,
    NzRadioModule
  ],
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.less']
})
export default class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  isConfirmModalVisible = false;
  isLoading = false;
  isEditing = false;
  isCollapsed = false;

  // Datos actuales del director
  datosActuales = {
    codigoSIE: '80730067',
    institucionEducativa: 'EDUARDO ABAROA III',
    ci: '4949911',
    complemento: '',
    apellidoPaterno: 'HUANCA',
    apellidoMaterno: 'RODRIGUEZ',
    nombres: 'ANDREA',
    cargo: 'DIRECTOR/A',
    expedido: 'NINGUNO',
    nacionalidad: 'Nacional',
    enlazadorApellido: 'NINGUNO',
    apellidoEsposo: '',
    fechaNacimiento: '06-01-1978',
    modalidadCobro: 'COBRO EN CAJA (BANCO UNIÓN)',
    cuentaBancaria: '0'
  };

  modalidadesCobro = [
    { label: 'COBRO EN CAJA (BANCO UNIÓN)', value: 'COBRO EN CAJA (BANCO UNIÓN)' },
    { label: 'ABONO EN CUENTA', value: 'ABONO EN CUENTA' }
  ];

  opcionesEnlazador = [
    { label: 'NINGUNO', value: 'NINGUNO' },
    { label: 'De', value: 'De' },
    { label: 'Vda. de', value: 'Vda. de' }
  ];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.registroForm = this.fb.group({
      // Información personal
      ci: [{ value: this.datosActuales.ci, disabled: true }, [Validators.required]],
      complemento: [{ value: this.datosActuales.complemento, disabled: true }],
      expedido: [{ value: this.datosActuales.expedido, disabled: true }, [Validators.required]],
      nacionalidad: [{ value: this.datosActuales.nacionalidad, disabled: true }, [Validators.required]],
      apellidoPaterno: [{ value: this.datosActuales.apellidoPaterno, disabled: true }, [Validators.required]],
      apellidoMaterno: [{ value: this.datosActuales.apellidoMaterno, disabled: true }, [Validators.required]],
      nombres: [{ value: this.datosActuales.nombres, disabled: true }, [Validators.required]],
      enlazadorApellido: [{ value: this.datosActuales.enlazadorApellido, disabled: true }, [Validators.required]],
      apellidoEsposo: [{ value: this.datosActuales.apellidoEsposo, disabled: true }],
      fechaNacimiento: [{ value: this.datosActuales.fechaNacimiento, disabled: true }, [Validators.required]],
      
      // Información bancaria
      modalidadCobro: [{ value: this.datosActuales.modalidadCobro, disabled: true }, [Validators.required]],
      cuentaBancaria: [{ value: this.datosActuales.cuentaBancaria, disabled: true }]
    });
  }

  ngOnInit(): void {
    // Configurar validaciones condicionales
    this.registroForm.get('enlazadorApellido')?.valueChanges.subscribe(value => {
      const apellidoEsposoControl = this.registroForm.get('apellidoEsposo');
      if (value !== 'NINGUNO') {
        apellidoEsposoControl?.setValidators([Validators.required]);
      } else {
        apellidoEsposoControl?.clearValidators();
        apellidoEsposoControl?.setValue('');
      }
      apellidoEsposoControl?.updateValueAndValidity();
    });

    this.registroForm.get('modalidadCobro')?.valueChanges.subscribe(value => {
      const cuentaBancariaControl = this.registroForm.get('cuentaBancaria');
      if (value === 'ABONO EN CUENTA') {
        cuentaBancariaControl?.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
      } else {
        cuentaBancariaControl?.clearValidators();
        cuentaBancariaControl?.setValue('0');
      }
      cuentaBancariaControl?.updateValueAndValidity();
    });
  }

  permitirEditar(): void {
    this.isEditing = true;
    this.habilitarFormulario();
    this.message.info('Modo edición habilitado. Puede modificar los datos.');
  }

  habilitarFormulario(): void {
    Object.keys(this.registroForm.controls).forEach(key => {
      this.registroForm.get(key)?.enable();
    });
  }

  deshabilitarFormulario(): void {
    Object.keys(this.registroForm.controls).forEach(key => {
      this.registroForm.get(key)?.disable();
    });
  }

  cancelarEdicion(): void {
    this.isEditing = false;
    this.registroForm.reset(this.datosActuales);
    this.deshabilitarFormulario();
    this.message.info('Edición cancelada. Los cambios no fueron guardados.');
  }

  mostrarConfirmacion(): void {
    if (this.registroForm.valid) {
      this.isConfirmModalVisible = true;
    } else {
      this.marcarCamposInvalidos();
      this.message.error('Por favor, complete todos los campos requeridos correctamente.');
    }
  }

  marcarCamposInvalidos(): void {
    Object.values(this.registroForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  confirmarDatos(): void {
    this.isLoading = true;
    
    // Simular procesamiento
    setTimeout(() => {
      this.isLoading = false;
      this.isConfirmModalVisible = false;
      this.isEditing = false;
      this.deshabilitarFormulario();
      
      // Actualizar datos actuales con los nuevos valores
      this.datosActuales = { ...this.datosActuales, ...this.registroForm.value };
      
      this.message.success('Datos actualizados correctamente. La información ha sido registrada.');
    }, 2000);
  }

  cancelarConfirmacion(): void {
    this.isConfirmModalVisible = false;
  }

  get esAbonoEnCuenta(): boolean {
    return this.registroForm.get('modalidadCobro')?.value === 'ABONO EN CUENTA';
  }

  get requiereApellidoEsposo(): boolean {
    return this.registroForm.get('enlazadorApellido')?.value !== 'NINGUNO';
  }
}