/* AccountProvider Service
Manages account-related data
*/

// Standard service stuff
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as models from '../app/classes';

@Injectable()
export class AccountProvider {
	
	// Array containing all accounts
	public accounts: models.Account[] = [];
	// Array containing current user's account
	public myAccount: models.Account = new models.Account();
	// Index and ID of selected account on AccountListPage
	public selectedAcct: number = 0;
	public selectedAcctID: number = 1;
	// Array containing all accounts sorted by total spent (descending)
	public sortBySpent: models.Account[];

	constructor(public http: Http) {
		console.log('Hello Account Provider');
	}
	
	// Create new account
	public createAccount(acct: any, apiKey: string) {
		return new Promise((resolve, reject) => {
			let headers = new Headers();
			let newAccount: models.Account;
			headers.append("Content-Type", "application/json");
			this.http.post("https://auctionitapi.azurewebsites.net/api/accounts/" + apiKey + "/create", JSON.stringify(this.account), {headers: headers})
			.subscribe(
				res => newAccount = res.json(),
				(err) => {},
				() => {
					resolve(newAccount);
				}
			);
		});
	}
	
	// Load all accounts
	public loadAllAccounts(apiKey: string) {
		return new Promise((resolve, reject) => {
			this.http.get("https://auctionitapi.azurewebsites.net/api/accounts/" + apiKey)
			.subscribe(
				res => this.accounts = res.json(),
				(err) => {},
				() => {
					// Duplicate the array and order it by total spent
					this.sortBySpent = this.accounts.slice().sort((obj1, obj2) => {
						if (obj1.totalSpent < obj2.totalSpent) {
							return -1;
						}
						else if (obj1.totalSpent > obj2.totalSpent) {
							return 1;
						}
						else return 0;
					});
					// Change from ascending to descending order
					this.sortBySpent.reverse();
					resolve();
				}
			);
		});
	}
	
	// Load the current user's account
	public loadMyAccount(apiKey: string) {
		return new Promise((resolve, reject) => {
			this.http.get("https://auctionitapi.azurewebsites.net/api/accounts/" + apiKey)
			.subscribe(
				res => this.myAccount = res.json(),
				(err) => {},
				() => {
					resolve();
				}
			);
		});
	}

}
