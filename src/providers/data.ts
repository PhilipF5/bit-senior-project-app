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
import * as models from '../app/classes';

@Injectable()
export class DataProvider {

	constructor(public http: Http, public acctProvider: AccountProvider, public auctionProvider: AuctionProvider, public loginProvider: LoginProvider, public lotProvider: LotProvider, public profileProvider: ProfileProvider) {
		console.log('Hello Data Provider');
	}
	
	// Accept highest bid on active lot as winner
	public acceptBid() {
		return new Promise((resolve, reject) => {
			this.lotProvider.acceptBid()
			.then(
				() => {
					resolve();
				}
			)
		});
	}
	
	// Check if active lot is open
	public activeLotIsOpen(): boolean {
		return (this.auctionTiming().startsWith("current") && !this.activeLotIsSold());
	}
	
	// Check if active lot is sold
	public activeLotIsSold(): boolean {
		return this.lotProvider.isSold();
	}
	
	// Check if auction is in past, present, or future
	public auctionTiming(auct?: models.Auction): string {
		if (!auct) {
			auct = this.auctionProvider.auction;
		}
		if (this.getRole() == "user" && this.auctionProvider.isCurrentForUser(auct)) {
			return "currentForUser";
		}
		if (this.auctionProvider.isCurrent(auct)) {
			return "current";
		}
		if (this.auctionProvider.isUpcoming(auct)) {
			return "upcoming";
		}
		if (this.auctionProvider.isPast(auct)) {
			return "past";
		}
		else return "error";
	}
	
	// Easy access to lot loaded in memory
	public getActiveLot(): models.Lot {
		return this.lotProvider.activeLot;
	}
	
	// Easy access to API key from LoginProvider
	public getApiKey(): string {
		return this.loginProvider.creds.apiKey;
	}
	
	// Easy access to user role from LoginProvider
	public getRole(): string {
		return this.loginProvider.creds.role;
	}
	
	// Check if user's account has won the active lot
	public hasWonActiveLot(acctID?: number): boolean {
		if (!acctID) {
			acctID = this.acctProvider.myAccount.id;
		}
		return this.lotProvider.hasWon(acctID);
	}
	
	// Check if user's account is winning the active lot
	public isWinningActiveLot(acctID?: number): boolean {
		if (!acctID) {
			acctID = this.acctProvider.myAccount.id;
		}
		return this.lotProvider.isWinning(acctID);
	}
	
	// Load data based on user role
	public loadData() {
		return new Promise((resolve, reject) => {
			if (this.loginProvider.creds.role == "user") {
				// The login is for a User
				Promise.all([
					this.acctProvider.loadMyAccount(this.getApiKey()),
					this.profileProvider.loadMyProfile(),
					this.auctionProvider.loadAllAuctions()
				]).then(() => {
					resolve();
				});
			}
			else if (this.loginProvider.creds.role == "admin") {
				// The login is for an Admin
				Promise.all([
					this.auctionProvider.loadAllAuctions(),
					this.acctProvider.loadAllAccounts(this.getApiKey())
					.then(() => {
						this.profileProvider.loadAllProfiles();
					})
				]).then(() => {
					resolve();
				});
			}
		});
	}
	
	// Handles login requests
	public login(username: string, password: string) {
		return new Promise((resolve, reject) => {
			this.loginProvider.login(username, password)
			.then(() => {
				if (this.getApiKey() == null) {
					// The login was invalid and returned an error
					reject(this.loginProvider.creds.error);
				}
				else {
					this.loadData()
					.then(() => {
						resolve();
					});
				}
			});
		});
	}
	
	// Place new bid
	public placeBid(amount: number) {
		return new Promise((resolve, reject) => {
			this.lotProvider.bidOnLot(amount, apiKey)
			.then(
				() => {
					resolve();
				},
				(err) => {
					reject(err);
				}
			)
		});
	}
	
	// Reloads active lot
	public refreshActiveLot() {
		for (let lot of this.auctionProvider.auction.lots) {
			if (lot.id == this.lotProvider.activeLot.id) {
				this.lotProvider.activeLot = lot;
			}
		}
	}
	
	// Reloads auction
	public refreshAuction() {
		this.auctionProvider.loadAuction(this.auctionProvider.auction.id, this.getApiKey());
	}
	
	// Sets the active lot in LotProvider
	public setActiveLot()

}
