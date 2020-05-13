import { ValidatorFn, AbstractControl } from "@angular/forms";
import * as moment from 'moment';

export const dateLessThanErrors = {
    dateLessThan: 'La Fecha de ingreso debe ser menor a la Fecha de egreso',
};

export class DateValidators {
    /** Form validator to check if the first moment date is before than the other */
  public static dateLessThan(dateField1: string, dateField2: string): ValidatorFn {
      return (c: AbstractControl): { [key: string]: any } | null => {
          const date1 = c.get(dateField1).value as moment.Moment;
          const date2 = c.get(dateField2).value as moment.Moment;
          if (moment.isMoment(date1) && moment.isMoment(date2) && moment.utc(date2).isBefore(moment.utc(date1))) {
            return {
                dateLessThan: true,
            };
          } else {
            return null;
          }
      };
  }
}
