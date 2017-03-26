import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoginProvider } from '../providers/login';
import { ProfileProvider } from '../providers/profile';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import 'moment-timezone';

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
	
	currentAuction = {
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
					if (this.loginProvider.creds.role == "user") {
						for (let auct of this.auctions) {
							if (this.isCurrentForUser(auct)) {
								this.currentAuction = auct;
							}
						}
					}
					resolve();
				}
			);
		});
	}
	
	isUpcoming(auct) {
		return !(moment().isAfter(auct.startTime));
	}
	
	isPast(auct) {
		return moment().isAfter(auct.endTime);
	}
	
	isCurrent(auct) {
		return (!this.isUpcoming(auct) && !this.isPast(auct));
	}
	
	isCurrentForUser(auct) {
		if (this.loginProvider.creds.role == "user") {
			return (this.profileProvider.profile.auctions.indexOf(auct.id) != -1 && !this.isUpcoming(auct) && !this.isPast(auct));
		}
	}

}
