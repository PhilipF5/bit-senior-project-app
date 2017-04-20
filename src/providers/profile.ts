import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import * as models from '../app/classes';

@Injectable()
export class ProfileProvider {
	
	public profile: models.Profile = new models.Profile();
	public profiles: models.Profile[] = [];
	public sortBySpent: models.Profile[];
	public wins: number;

	constructor(public http: Http) {
		
	}
	
	public createProfile(prof: any, apiKey: string) {
		return new Promise((resolve, reject) => {
			let headers = new Headers();
			let newUser: models.Profile;
			headers.append("Content-Type", "application/json");
			this.http.post("https://auctionitapi.azurewebsites.net/api/profiles/" + apiKey + "/create", JSON.stringify(prof), {headers: headers})
			.subscribe(
				res => newUser = res.json(),
				(err) => {},
				() => {
					resolve(newUser);
				}
			);
		});
	}
	
	public loadAllProfiles(accounts: models.Account[]) {
		return new Promise((resolve, reject) => {
			for (let acct of accounts) {
				for (let profile of acct.buyers) {
					profile["accountOwner"] = acct.owner;
					this.profiles.push(profile);
				}
			}
			this.sortBySpent = this.profiles.slice().sort((obj1, obj2) => {
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
	
	public loadMyProfile(apiKey: string) {
		return new Promise((resolve, reject) => {
			this.http.get("https://auctionitapi.azurewebsites.net/api/profiles/" + apiKey)
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

}
