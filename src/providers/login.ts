import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {
	
	creds = {
		apiKey: null,
		error: null,
		firstName: null,
		lastName: null,
		role: null,
		username: null
	};
	username: string;
	password: string;

	constructor(public http: Http) {

	}
	
}
