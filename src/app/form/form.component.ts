import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DateValidators } from '../shared/utils/validation/validators/date.validators';
import { Developer } from '../models/dev';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class AppFormComponent implements OnInit{
  //#region .: Variables :.
  form: FormGroup;  
  devs: Array<Developer> = [
    {
      id: 1,
      description: 'Ivo Perpiña'
    },
    {
      id: 2,
      description: 'Alexei Sarmiento'
    },
    {
      id: 3,
      description: 'Juan Cumba'
    },
    {
      id: 4,
      description: 'Carlos Lorda'
    },
    {
      id: 5,
      description: 'Teófilo Rodriguez'
    },
    {
      id: 6,
      description: 'Angel Diaz Gil'
    },
  ];

  @Output() onDevAdded: EventEmitter<any> = new EventEmitter<any>();
  //#endregion

  //#region .: Constructor :.
  constructor() {}
  //#endregion

  //#region .: Public Methods :.
  saveDev() {
    const dev = this.form.getRawValue();
    this.onDevAdded.emit(dev);
  }

  clear() {
    this.form.patchValue({});
  }

  //#endregion
  
  //#region .: Init/Destroy :.
  ngOnInit(){

    // map request on form
    this.form = new FormGroup({
      id: new FormControl(0),
      updateDate: new FormControl(moment.utc()),
      dev: new FormControl(null, [ Validators.required ]),
      beginDate: new FormControl(null, [ Validators.required ]),
      endDate: new FormControl(null),
    }, [ DateValidators.dateLessThan(
            'beginDate',
            'endDate',
        )
    ]);
  }

  //#endregion
}
