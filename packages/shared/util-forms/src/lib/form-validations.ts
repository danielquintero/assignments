import { upperLowerDigitSymbol } from './form-patterns';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

/**
 * Custom validator to check that a given control does not include other control's values
 * @param controlName {string} the name of the control to check
 * @param matchingControls {Array<string>} the names of the controls which hold value/s to check against
 * @returns the validation errors, or null when no errors
 */
export function MustNotMatch(
  controlName: string,
  matchingControls: Array<string>
): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const formGroup = form as FormGroup;
    const control = formGroup.controls[controlName];
    if (!control || !hasControls(formGroup, matchingControls)) {
      console.warn(
        `The control names passed to 'MustNotMatch' were not found! Please make sure you are supplying the correct names`
      );
    } else {
      const { value } = control;
      if (includesValues(value, formGroup, matchingControls)) {
        return { mustNotMatch: true };
      }
    }

    return null;
  };
}

export function includesValues(
  value: string,
  form: FormGroup,
  controls: Array<string>
): boolean {
  return controls.some((control) =>
    form.controls[control].value === ''
      ? false
      : value.includes(form.controls[control].value)
  );
}

export function hasControls(form: FormGroup, controls: Array<string>): boolean {
  if (controls.length <= 0) return false;

  return controls.every((control) => form.controls[control]);
}

export function ValidatePasswordStrength() {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control || !control.value) return null;
    if (!upperLowerDigitSymbol.test(control.value as string)) {
      return { weakPassword: true };
    }

    return null;
  };
}
