import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { minDate } from '../utils/custom-validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-alumno',
  templateUrl: './formulario-alumno.component.html',
  styleUrls: ['./formulario-alumno.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class FormularioAlumnoComponent {
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }
  selected = '1';
  formGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.group([
        this._formBuilder.group({
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          dni: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
          fechaNacimiento: ['', [Validators.required, minDate]],
        }),
        this._formBuilder.group({
          calle: ['', Validators.required],
          numero: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
          piso: [''],
          dpto: [''],
          codigoPostal: ['', Validators.required],
          provincia: ['', Validators.required],
          localidad: ['', Validators.required],
        }),
        this._formBuilder.group({
          tipoTelefono: [1, Validators.required],
          numeroTelefono: [
            '',
            [Validators.required, Validators.pattern('^[0-9]+')],
          ],
          correoElectronico: ['', [Validators.required, Validators.email]],
          linkedin: [''],
          facebook: [''],
          instagram: [''],
        }),
      ]),
    });
    const formArray = this.formGroup.get('formArray') as FormArray;
  }
  //GETTERS DE CONTROLES
  //No encontré una manera mejor de obtener los controles cuando hay varios formularios agrupados en uno solo
  get nombreControl() {
    if (this.formArray) {
      const nombreControl = this.formArray.get('0')?.get('nombre');
      return nombreControl;
    }
    return null;
  }
  get apellidoControl() {
    if (this.formArray) {
      const apellidoControl = this.formArray.get('0')?.get('apellido');
      return apellidoControl;
    }
    return null;
  }
  get dniControl() {
    if (this.formArray) {
      const dniControl = this.formArray.get('0')?.get('dni');
      return dniControl;
    }
    return null;
  }

  get fechaNacimientoControl() {
    if (this.formArray) {
      const fechaNacimientoControl = this.formArray
        .get('0')
        ?.get('fechaNacimiento');
      return fechaNacimientoControl;
    }
    return null;
  }

  get calleControl() {
    if (this.formArray) {
      const calleControl = this.formArray.get('1')?.get('calle');
      return calleControl;
    }
    return null;
  }
  get numeroControl() {
    if (this.formArray) {
      const numeroControl = this.formArray.get('1')?.get('numero');
      return numeroControl;
    }
    return null;
  }
  get codigoPostalControl() {
    if (this.formArray) {
      const codigoPostalControl = this.formArray.get('1')?.get('codigoPostal');
      return codigoPostalControl;
    }
    return null;
  }
  get provinciaControl() {
    if (this.formArray) {
      const provinciaControl = this.formArray.get('1')?.get('provincia');
      return provinciaControl;
    }
    return null;
  }
  get localidadControl() {
    if (this.formArray) {
      const localidadControl = this.formArray.get('1')?.get('localidad');
      return localidadControl;
    }
    return null;
  }
  get tipoTelefonoControl() {
    if (this.formArray) {
      const tipoTelefonoControl = this.formArray.get('2')?.get('tipoTelefono');
      return tipoTelefonoControl;
    }
    return null;
  }
  get numeroTelefonoControl() {
    if (this.formArray) {
      const numeroTelefonoControl = this.formArray
        .get('2')
        ?.get('numeroTelefono');
      return numeroTelefonoControl;
    }
    return null;
  }
  get correoElectronicoControl() {
    if (this.formArray) {
      const correoElectronicoControl = this.formArray
        .get('2')
        ?.get('correoElectronico');
      return correoElectronicoControl;
    }
    return null;
  }

  //CREACIÓN DE ALUMNO

  openSnackBar() {
    this._snackBar.open('Alumno creado', 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  onSubmit() {
    if (this.formGroup.invalid) {
      alert('Formulario invalido');
    } else {
      this.openSnackBar();
      console.log(this.formGroup.value);
    }
  }
}
