/*
	Profile Provider Service
	========================
	Manages profile-related data.
*/

// Standard service stuff
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// Import needed libraries
import * as models from '../app/classes';

@Injectable()
export class ProfileProvider {
	
	// Store profile of current user
	public profile: models.Profile = new models.Profile();
	// Admins get all profiles instead
	public profiles: models.Profile[] = [];
	// All profiles sorted by total spent (descending)
	public sortBySpent: models.Profile[];
	// Number of lots won by user
	public wins: number;

	constructor(public http: Http) {
		
	}
	
	// Create a new profile via the API
	public createProfile(prof: any, apiKey: string) {
		return new Promise((resolve, reject) => {
			// Use HTTPS POST
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
	
	// Load all profiles from accounts array
	public loadAllProfiles(accounts: models.Account[]) {
		return new Promise((resolve, reject) => {
			for (let acct of accounts) {
				for (let profile of acct.buyers) {
					profile["accountOwner"] = acct.owner;
					this.profiles.push(profile);
				}
			}
			// Create sorted array
			this.sortBySpent = this.profiles.slice().sort((obj1, obj2) => {
				if (obj1.totalSpent < obj2.totalSpent) {
					return -1;
				}
				else if (obj1.totalSpent > obj2.totalSpent) {
					return 1;
				}
				else return 0;
			});
			// Flip sorted array to descending order
			this.sortBySpent.reverse();
			resolve();
		});
	}
	
	// Load specific profile from API
	public loadMyProfile(apiKey: string) {
		return new Promise((resolve, reject) => {
			this.http.get("https://auctionitapi.azurewebsites.net/api/profiles/" + apiKey)
			.subscribe(
				res => {
					this.profile = res.json();
				},
				(err) => {},
				() => {
					// Count the number of lots won by user
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
