/* AccountProvider Service
Manages account-related data
*/

// Standard service stuff
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountProvider {
	
	// Array containing all accounts
	public accounts: Account[];
	// Array containing current user's account
	public myAccount: Account = new Account();
	// Index and ID of selected account on AccountListPage
	public selectedAcct: number = 0;
	public selectedAcctID: number = 1;
	// Array containing all accounts sorted by total spent (descending)
	public sortBySpent: Account[];

	constructor(public http: Http) {
		console.log('Hello Account Provider');
	}
	
	// Load the current user's account
	loadMyAccount(apiKey: string) {
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
	
	// Load all accounts
	loadAllAccounts(apiKey: string) {
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

}

// Structure of account objects from API
export class Account {

	public address: string;
	public availableCredit: number;
	public buyers: any;
	public city: string;
	public contactEmail: string;
	public contactPhone: string;
	public id: number;
	public owner: string;
	public postalCode: string;
	public state: string;
	public stateCode: string;
	public totalCredit: number;
	public totalSpent: number;
	public usedCredit: number;
	
}
