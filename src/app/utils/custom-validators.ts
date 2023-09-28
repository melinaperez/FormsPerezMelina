import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minDate(control: AbstractControl): ValidationErrors | null {
  if (control.value > new Date()) {
    return {
      minDate: true,
    };
  }

  return null;
}
