import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Import all specific providers
import { AccountProvider } from '../providers/account';
import { AuctionProvider } from '../providers/auction';
import { LoginProvider } from '../providers/login';
import { LotProvider } from '../providers/lot';
import { ProfileProvider } from '../providers/profile';

// Import libraries
import * as moment from 'moment';
import 'moment-timezone';

@Injectable()
export class DataProvider {

	constructor(public http: Http, public acctProvider: AccountProvider, public auctionProvider: AuctionProvider, public loginProvider: LoginProvider, public lotProvider: LotProvider, public profileProvider: ProfileProvider) {
		console.log('Hello Data Provider');
	}
	
	public login(username: string, password: string) {
		return new Promise((resolve, reject) => {
			this.loginProvider.login(username, password)
			.then(() => {
				if (this.loginProvider.creds.apiKey == null) {
					reject(this.loginProvider.creds.error);
				}
				if (this.loginProvider.creds.role == "user") {
					Promise.all([
						this.acctProvider.loadMyAccount(),
						this.profileProvider.loadMyProfile(),
						this.auctionProvider.loadAllAuctions()
					]).then(() => {
						resolve();
					});
				}
				else if (this.loginProvider.creds.role == "admin") {
					Promise.all([
						this.auctionProvider.loadAllAuctions(),
						this.acctProvider.loadAllAccounts().then(() => {
							this.profileProvider.loadAllProfiles();
						})
					]).then(() => {
						resolve();
					})
				}
			});
		});
	}

}
