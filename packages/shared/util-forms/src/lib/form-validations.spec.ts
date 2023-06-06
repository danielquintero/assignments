/* eslint-disable no-null/no-null */
import { AbstractControl, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { MustNotMatch, ValidatePasswordStrength } from './form-validations';

describe('Form validations', () => {
	// eslint-disable-next-line functional/immutable-data
	global.console.warn = jest.fn();

	let form: FormGroup;
	const firstNameControl: AbstractControl = new FormControl('');
	const lastNameControl: AbstractControl = new FormControl('');
	const passwordControl: AbstractControl = new FormControl('');

	describe('MustNotMatch()', () => {
		beforeEach(() => {
			form = new FormGroup({
				firstName: firstNameControl,
				lastName: lastNameControl,
				password: passwordControl,
			});
			// form.setValidators(MustNotMatch('password', ['firstName', 'lastName']));
		});

		it('should have mustNotMatch set to true', () => {
			const expected = { mustNotMatch: true };
			expect(MustNotMatch('password', ['firstName', 'lastName'])(form)).toEqual(expected);
		});
		it('should not have error mustNotMatch set', () => {
			expect(MustNotMatch('foo', ['firstName', 'lastName'])(form)).toEqual(null);
			expect(MustNotMatch('password', ['foo', 'lastName'])(form)).toEqual(null);
			expect(MustNotMatch('-', ['firstName', 'bar'])(form)).toEqual(null);
		});
	});

	describe('ValidatePasswordStrength()', () => {
		it('should have weakPassword set to true', () => {
			const expected = { weakPassword: true };
			expect(ValidatePasswordStrength()(new FormControl('qwerty'))).toEqual(expected);
		});
		it('should not have error weakPassword set', () => {
			expect(
				ValidatePasswordStrength()(new FormControl('ny),AFlgnvHje,pFL)dKR-FD2L-SqwkJv')),
			).toEqual(null);
		});
	});
});
