import { Component, OnInit, Inject, Injector } from '@angular/core';

@Component( {
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.css' ]
} )
export class UserComponent {
  public params: any = null;

  constructor(
    injector: Injector
  ) {
    this.params = injector.get( 'componentParams' );
  }
}
