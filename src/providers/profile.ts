import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoginProvider } from '../providers/login';
import { AccountProvider } from '../providers/account';
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
	
	profiles = [];
	
	sortBySpent = [];
	
	wins;

	constructor(public http: Http, public loginProvider: LoginProvider, public acctProvider: AccountProvider) {
		
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
					this.wins = 0;
					for (let bid of this.profile.bids) {
						if (bid.status == "Winner") {
							this.wins++;
						}
					}
					resolve();
				}
			);
		});
	}
	
	loadAllProfiles() {
		return new Promise((resolve, reject) => {
			for (let acct of this.acctProvider.accounts) {
				// profiles = profiles.concat(acct.buyers);
				for (let profile of acct.buyers) {
					profile["accountOwner"] = acct.owner;
					this.profiles.push(profile);
				}
			}
			this.sortBySpent = this.profiles.sort((obj1, obj2) => {
				if (obj1.totalSpent < obj2.totalSpent) {
					return -1;
				}
				else if (obj1.totalSpent > obj2.totalSpent) {
					return 1;
				}
				else return 0;
			});
			this.sortBySpent.reverse();
			resolve();
		});
	}

}
