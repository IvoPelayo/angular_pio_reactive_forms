import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  devList: Array<any> = [];
  displayedColumns: string[] = ['id', 'description', 'startDate', 'endDate', 'updateDate'];

  constructor(){

  }

  addToList(dev: any) {
    this.devList.push(dev);
  }
}
