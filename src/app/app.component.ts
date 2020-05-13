import { Component } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  devList: Array<any> = [];
  displayedColumns: string[] = ['id', 'description', 'startDate', 'endDate', 'updateDate'];

  constructor(private toastr: NotificationsService){

  }

  addToList(dev: any) {
    this.devList.push(dev);
    this.toastr.create(
      'Desarrollador agregado a la lista',
      null,
      NotificationType.Success,
      {
        timeOut: 3000,
        clickToClose: true
      }
    );
  }
}
