import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoginProvider } from '../providers/login';
import { ProfileProvider } from '../providers/profile';
import 'rxjs/add/operator/map';

/*
  Generated class for the Auction provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class AuctionProvider {

	auction = {
		address: "",
		buyers: null,
		city: "",
		endTime: null,
		id: null,
		lots: null,
		participants: null,
		postalCode: "",
		startTime: null,
		state: null,
		stateCode: ""
	};
	
	auctions = [];
	
	myAuctions = [];

	constructor(public http: Http, public loginProvider: LoginProvider, public profileProvider: ProfileProvider) {
		
	}
	
	loadAuction(id) {
		return new Promise((resolve, reject) => {
			this.http.get("http://auctionitapi.azurewebsites.net/api/auctions/" + this.loginProvider.creds.apiKey + "/" + id)
			.subscribe(
				res => {
					this.auction = res.json();
				},
				(err) => {},
				() => {
					resolve();
				}
			);
		});
	}
	
	loadAllAuctions() {
		return new Promise((resolve, reject) => {
			this.http.get("http://auctionitapi.azurewebsites.net/api/auctions/" + this.loginProvider.creds.apiKey)
			.subscribe(
				res => {
					this.auctions = res.json();
				},
				(err) => {},
				() => {
					resolve();
				}
			);
		});
	}

}
