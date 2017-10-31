import { Component, ReflectiveInjector, Injectable, ExistingProvider, ValueProvider, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { UserComponent } from 'app/user/user.component';
import { ItemComponent } from 'app/item/item.component';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent implements OnInit {

  public exampleEventString = 'Пользователь {user} купил {item}, и сломал её';
  public exampleEventParams = `{
  "user": {
      "name":"Вася",
      "url":"http://ya.ru"
    },

  "item": {
    "name": "Штуковина",
     "price": "100"
    }
  }`;

  public eventString = new FormControl();
  public eventParams = new FormControl();
  public parsedEventParams: any = JSON.parse( this.exampleEventParams );
  public tokens = [];

  public feedReady = false;
  public eventStringValid = false;
  public eventParamsValid = false;

  constructor( private injector: Injector ) { }


  public createComponents ( eventString: string, paramsString: string ) {
    const re = /\s*(\{.*?\})\s*/g;
    this.feedReady = false;

    if ( paramsString ) {
      try {
        this.parsedEventParams = JSON.parse( paramsString );
        this.eventParamsValid = true;
      } catch ( e ) {
        this.eventParamsValid = false;
      }
    }

    if ( eventString ) {
      this.tokens = [];
      const tokens = eventString.split( re ).filter( Boolean );
      // tslint:disable-next-line:forin
      for ( const token of tokens ) {
        const isComponent = token.includes( '{' );
        const strippedValue = token.replace( /[{}]/g, '' );
        if ( isComponent ) {
          const componentParams = this.parsedEventParams[ strippedValue ];

          const provider: ValueProvider = {
            provide: 'componentParams',
            useValue: componentParams
          };

          this.tokens.push( {
            isComponent: true,
            type: strippedValue,
            component: strippedValue === 'user' ? UserComponent : ItemComponent,
            injector: ReflectiveInjector.resolveAndCreate( [ provider ], this.injector )
          } );
        } else {
          this.tokens.push( {
            isComponent: false,
            title: strippedValue
          } )
        }
      }

      this.eventStringValid = true;
    }


    this.feedReady = this.eventParamsValid && this.eventStringValid;
  }

  ngOnInit (): void {
    this.eventParams.valueChanges
      .debounceTime( 100 )
      .distinctUntilChanged()
      .subscribe( () => {
        this.createComponents( this.eventString.value, this.eventParams.value );
      } );

    this.eventString.valueChanges
      .debounceTime( 100 )
      .distinctUntilChanged()
      .subscribe( () => {
        this.createComponents( this.eventString.value, this.eventParams.value );
      } );
  }
}
