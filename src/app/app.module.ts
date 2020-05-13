import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppFormComponent } from './form/form.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [
    AppComponent,
    AppFormComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SimpleNotificationsModule.forRoot({
      position: ['top', 'right'],
      timeOut: 3000,
      showProgressBar: false,
      maxLength: 300,
      maxStack: 3,
      preventDuplicates: true,
      clickToClose: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
