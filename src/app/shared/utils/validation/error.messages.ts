import { InjectionToken } from '@angular/core';
import { dateLessThanErrors } from './validators/date.validators';

export const defaultErrors: any = {
  required: 'Este campo es requerido',
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => {
        return {
            ...defaultErrors,
            ...dateLessThanErrors,
        };
  }
});
