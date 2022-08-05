# Reactive Forms

Reactive Forms es un módulo que nos provee Angular para definir formularios de una forma inmutable y reactiva. Por medio de este módulo podemos construir controles dentro de un formulario y asociarlos a las etiquetas HTML del template sin necesidad de usar explícitamente un ngModel.

A diferencia de Angular Forms, Reactive Forms hace uso de Observables para mantener trackeada los datos del formulario, lo cual nos permite interceptarla y transformarla por medio de operadores usando RxJs.

```typescript
@NgModule({
  imports: [
    ReactiveFormsModule,
    ...
  ],
})
export class AppModule { }
```

[Reactive Forms - Angular](https://angular.io/guide/reactive-forms)

## Componentes

Para la creación y modelado de nuestro formulario se utilizan distintos componentes del modulo de Reactive Forms, los cuales ofrecen propiedades y funcionalidades muy útiles a la hora de validar y controlar el estado actual del formulario.

### FormGroup

Grupo de controles que conservan cierta logica conjunta. Se suele agrupar campos que forman parte de un mismo modelo o deben ser validados de manera conjunta.

```typescript
class ExampleComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      ...
    });

    this.form = new FormGroup({
      ...
    });
  }
}
```
```html
<form [formGroup]="form" (ngSubmit)="save()">
  ...
  <button type="submit">Guardar</button>
</form>
```
[FormGroup - Angular](https://angular.io/api/forms/FormGroup)

### FormControl

Representa un control o elemento simple del formulario (input, select, textarea, file, etc).

```typescript
class ExampleComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
}
```
```html
<form [formGroup]="form">
  <input formControlName="email" />
  <input type="password" formControlName="password" />
</form>

<!-- Angular Material -->
<form [formGroup]="form">
  <mat-form-field appearance="outline">
      <mat-label>Email</mat-label>
      <input matInput formControlName="email" />
  </mat-form-field>
  <mat-form-field appearance="outline">
      <mat-label>Password</mat-label>
      <input matInput type="password" formControlName="password" />
  </mat-form-field>
</form>
```

[FormControl - Angular](https://angular.io/api/forms/FormControl)

### FormArray

Representa una colección de items, los cuales pueden ser elementos simples como strings, FormControls, FormGroups.

```typescript
ngOnInit() {
  this.form = new FormGroup({
    items: new FormArray([]),
  });
}

get items() {
  return this.form.get('items') as FormArray;
}

addItem() {
  this.items.push(new FormControl(''));
}
```
```html
<div formArrayName="items">
  <h3>Items</h3> <button (click)="addItem()">Nuevo Item</button>

  <div *ngFor="let item of items.controls; let i=index">
    <input type="text" [formControlName]="i">
  </div>
</div>
```
[FormArray - Angular](https://angular.io/api/forms/FormArray)

## Get / Set

Para iteractuar con nuestro formulario, sus campos, validaciónes y valores, estos componentes poseen los siguientes metodos:
```typescript
const email = this.form.get('email').value; // get value from a form control

this.form.get('email').setValue('johndoe@vueling.com'); //set value in form control

this.form.patchValue(data); // map object (with same strcuture) in form group

const data = this.form.getRawValue(); // gets FormGroup controls as an object;

//type safe that shit
const data: MyModel = this.form.getRawValue();
const data = this.form.getRawValue() as MyModel;
const data: new MyModel(this.form.getRawValue());

```

## Eventos

Como mencionamos en un principio, Reactive Forms incorpora una serie de eventos (Observables) los cuales podemos utilizar para monitorear el estado actual del formulario o sus controles, y reaccionar en base a ello:

```typescript
this.form.valueChanges.subscribe(() => {
    this.form.get('email').setValue('pepe@pepe.com', { emitEvent: false });
});
this.form.statusChanges.subscribe(() => {
    ...
});

```
[]()

## Validators

El modulo de Angular Forms ofrece algunas validaciones básicas ya incorporadas dentro de la clase Validators, equivalentes a aquellas usadas en inputs HTML5.

```typescript
import { FormGroup, FormControl, Validators } from '@angular/forms';

... 

this.form = new FormGroup({
  email: new FormControl('', [
    // validaciones síncronas
    Validators.required,
    Validators.email
  ], [
    // validaciones asíncronas
  ]),
  password: new FormControl('')
});
```
También es posible modificar las validaciones dinámicamente a través de los metodos que proveen las clases:

```typescript
this.form.get('email').updateValueAndValidity(...);
this.form.get('email').clearValidators(...);
this.form.get('email').setValidators(...);
```
## Custom Validators

Además de los validadores por defecto que ofrece el modulo de Angular Forms, podemos crear nuestros propios validadores los cuales podrian utilizarse para un FormControl, FormGroup o FormArray.

```typescript
export function fixedLength(requiredLength: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: any } | null => {
        if (c.value.length !== requiredLength) {
          return {
            fixedLength: true
          };
        } else {
          return null;
        }
    };
}

//Async custom validator
export function exampleAsyncValidator(service: ExampleService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return service.exampleApiValdation(control.value).pipe(
        map((result: boolean) => result ? null : { exampleAsync: true} )
      );
    };
  }

...
password: new FormControl('', [Validators.required, fixedLength(10) ])
```

## Error display (Angular Material)

```html
  <mat-form-field appearance="outline">
      <mat-label>Email</mat-label>
      <input matInput formControlName="email" />
      <mat-error *ngIf="form.get('email').errors && form.get('email').errors.required">Este campo es requerido.</mat-error>
      <mat-error *ngIf="form.get('email').errors && form.get('email').errors.notEmail">Formato de email incorrecto.</mat-error>
      <mat-error *ngIf="form.get('email').errors && form.get('email').errors.notMatch">El email no coincide...</mat-error>
  </mat-form-field>
```
[Custom Validations - Angular](https://angular.io/guide/form-validation#custom-validators)
[Async Validations - Angular](https://angular.io/api/forms/AsyncValidator)


## BONUS: Mensajes de errores automaticos

### Angular Directives

Componentes de angular que, agregado a un elemento HTML como un atributo, pueden agregar o modificar su funcionalidad.

```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```
```html
<p appHighlight>Highlight me!</p>

```
[Angular - Attribute Directives](https://angular.io/guide/attribute-directives)


# ValidationMessagesApp

Example app to show basic Angular Validations

1 - Install NPM packages
```
npm install
```

Run locally on (localhost)[http://localhost:4200]

```
npm run start     // o ng serve
```
