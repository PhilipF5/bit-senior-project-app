import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginProvider } from '../providers/login'

/*
  Generated class for the Account provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccountProvider {
	
	myAccount = {
		address: null,
		availableCredit: null,
		city: null,
		contactEmail: null,
		contactPhone: null,
		id: null,
		owner: null,
		postalCode: null,
		state: null,
		stateCode: null,
		totalCredit: null,
		totalSpent: null,
		usedCredit: null
	};

	constructor(public http: Http, public loginProvider: LoginProvider) {
		console.log('Hello Account Provider');
	}
	
	loadMyAccount() {
		this.http.get("http://auctionitapi.azurewebsites.net/api/accounts/" + this.loginProvider.creds.apiKey)
		.subscribe(
			res => this.myAccount = res.json(),
			(err) => {},
			() => {
				
			}
		);
	}

}
