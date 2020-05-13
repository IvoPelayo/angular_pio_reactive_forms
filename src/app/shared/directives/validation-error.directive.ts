import {
    Directive,
    OnDestroy,
    Inject,
    Input,
    AfterViewInit,
    Host,
    ElementRef,
    Optional
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FORM_ERRORS } from '../utils/validation/error.messages';
import { MatFormField } from '@angular/material';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[validationMessages]'
})
export class ValidationErrorDirective implements AfterViewInit, OnDestroy {
    private subscription: Subscription;
    @Input() validationMessages: { [key: string]: any} ;

    constructor(private el: ElementRef<HTMLElement>,
                @Optional() @Host() private form: FormGroupDirective,
                @Optional() @Host() private field: MatFormField,
                @Inject(FORM_ERRORS) private errors)
    {}

    ngAfterViewInit() {
        if (this.field) {
            this.subscription = this.field._control.stateChanges.subscribe(() => {
                const controlErrors = this.field._control.ngControl.errors;
                this.setError(controlErrors);
            });
        }
        else if (this.form) {
            this.subscription = this.form.statusChanges.subscribe(() => {
                const controlErrors = this.form.errors;
                this.setError(controlErrors);
            });
        }
    }

    setError(errors: any) {
        let text = null;
        if (errors) {
            const firstKey = Object.keys(errors)[0];
            const text = this.errors[firstKey];
        }

        this.el.nativeElement.hidden = text ? false : true;
        this.el.nativeElement.innerHTML = text;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
