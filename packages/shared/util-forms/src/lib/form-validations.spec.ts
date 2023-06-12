import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MustNotMatch, ValidatePasswordStrength } from './form-validations';

describe('Form validations', () => {
  global.console.warn = jest.fn();

  let form: FormGroup;
  const firstNameControl: AbstractControl = new FormControl('John');
  const lastNameControl: AbstractControl = new FormControl('Doe');
  const passwordControl: AbstractControl = new FormControl('John.doe1234F%4');

  describe('MustNotMatch()', () => {
    beforeEach(() => {
      form = new FormGroup(
        {
          firstName: firstNameControl,
          lastName: lastNameControl,
          password: passwordControl,
        },
        {
          validators: MustNotMatch('password', ['firstName', 'lastName']),
        }
      );
    });

    it('should have mustNotMatch set to true', () => {
      const expected = { mustNotMatch: true };
      expect(MustNotMatch('password', ['firstName', 'lastName'])(form)).toEqual(
        expected
      );
    });

    it('should not have error mustNotMatch set when it meets the validation', () => {
      form.controls['firstName'].setValue('Jane');
      form.controls['lastName'].setValue('Doe');
      form.controls['password'].setValue('P@ssw0rd$dT');
      expect(MustNotMatch('password', ['firstName', 'lastName'])(form)).toEqual(
        null
      );
    });

    it('should not have error mustNotMatch set when the control/s do not exist', () => {
      expect(MustNotMatch('foo', ['firstName', 'lastName'])(form)).toEqual(
        null
      );
      expect(MustNotMatch('password', ['foo', 'bar'])(form)).toEqual(null);
      expect(MustNotMatch('-', ['^', '*'])(form)).toEqual(null);
    });
  });

  describe('ValidatePasswordStrength()', () => {
    it('should have weakPassword set to true', () => {
      const expected = { weakPassword: true };
      expect(ValidatePasswordStrength()(new FormControl('qwerty'))).toEqual(
        expected
      );
    });
    it('should not have error weakPassword set', () => {
      expect(
        ValidatePasswordStrength()(
          new FormControl('ny),AFlgnvHje,pFL)dKR-FD2L-SqwkJv')
        )
      ).toEqual(null);
    });
  });
});
