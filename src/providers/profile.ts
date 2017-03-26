import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoginProvider } from '../providers/login';
import 'rxjs/add/operator/map';

/*
  Generated class for the Profile provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class ProfileProvider {
	
	profile = {
		accountID: null,
		auctions: [],
		bids: [],
		bidsMax: null,
		bidsMin: null,
		id: null,
		firstName: "",
		lastName: "",
		totalSpent: null,
		username: "",
		auctionCount: null,
		bidsCount: null,
		fullName: ""
	};

	constructor(public http: Http, public loginProvider: LoginProvider) {
		
	}
	
	loadMyProfile() {
		return new Promise((resolve, reject) => {
			this.http.get("http://auctionitapi.azurewebsites.net/api/profiles/" + this.loginProvider.creds.apiKey)
			.subscribe(
				res => {
					this.profile = res.json();
				},
				(err) => {},
				() => {
					resolve();
				}
			);
		});
	}
	
	lotsWon() {
		
	}

}
