import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './item/item.component';

@NgModule( {
  declarations: [
    AppComponent,
    UserComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [
    UserComponent,
    ItemComponent
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
