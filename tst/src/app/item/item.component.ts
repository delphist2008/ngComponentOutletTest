import { Component, OnInit, Injector } from '@angular/core';

@Component( {
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: [ './item.component.css' ]
} )
export class ItemComponent {
  public params: any = null;

  constructor(
    injector: Injector
  ) {
    this.params = injector.get( 'componentParams' );
  }

}
