import { Component, ReflectiveInjector, Injectable, ExistingProvider, ValueProvider, Injector } from '@angular/core';
import { UserComponent } from 'app/user/user.component';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent {

  public ready = false;
  public components = [];
  constructor( private injector: Injector ) { }

  public add () {
    for ( const userName of [ 'Вася', 'Петя' ] ) {
      const componentParams = {
        name: userName
      };

      const provider: ValueProvider = {
        provide: 'componentParams',
        useValue: componentParams
      };

      const component = {
        type: UserComponent,
        params: ReflectiveInjector.resolveAndCreate( [ provider ], this.injector )
      };

      this.components.push( component );
    }

    this.ready = true;
  }
}
