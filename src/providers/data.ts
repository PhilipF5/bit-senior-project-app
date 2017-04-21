import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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

	public chartData: any = {
		models: null,
		states: null,
		types: null
	};

	constructor(public http: Http, public acctProvider: AccountProvider, public auctionProvider: AuctionProvider, public loginProvider: LoginProvider, public lotProvider: LotProvider, public profileProvider: ProfileProvider) {
		
	}
	
	// Getters and setters
	public get accounts(): models.Account[] {
		return this.acctProvider.accounts;
	}
	
	public get accountsBySpent(): models.Account[] {
		return this.acctProvider.sortBySpent;
	}
	
	public get activeAccount(): any {
		return this.acctProvider.myAccount;
	}
	
	public set activeAccount(index: any) {
		this.acctProvider.selectedAcct = index;
		this.acctProvider.selectedAcctID = this.acctProvider.accounts[index].id;
	}
	
	public get activeAuction(): models.Auction {
		return this.auctionProvider.auction;
	}
	
	public get activeLot(): any {
		return this.lotProvider.activeLot;
	}
	
	public set activeLot(lotID: any) {
		for (let lot of this.auctionProvider.auction.lots) {
			if (lot.id == lotID) {
				this.lotProvider.activeLot = lot;
			}
		}
	}
	
	public get activeProfile(): models.Profile {
		return this.profileProvider.profile;
	}
	
	public get apiKey(): string {
		return this.loginProvider.creds.apiKey;
	}
	
	public get auctions(): models.Auction[] {
		return this.auctionProvider.auctions;
	}
	
	public get creds(): models.Credentials {
		return this.loginProvider.creds;
	}
	
	public get currentAuction(): models.Auction {
		return this.auctionProvider.currentAuction;
	}
	
	public get myAccount(): models.Account {
		return this.acctProvider.myAccount;
	}
	
	public get profilesBySpent(): models.Profile[] {
		return this.profileProvider.sortBySpent;
	}
	
	public get role(): string {
		return this.loginProvider.creds.role;
	}
	
	public get selectedAcctID(): number {
		return this.acctProvider.selectedAcctID;
	}
	
	public get selectedAcctIndex(): number {
		return this.acctProvider.selectedAcct;
	}
	
	// Accept highest bid on active lot as winner
	public acceptBid() {
		return new Promise((resolve, reject) => {
			this.lotProvider.acceptBid(this.apiKey)
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
		return this.activeLot.status == "Sold";
	}
	
	// Check if auction is in past, present, or future
	public auctionTiming(auct?: models.Auction): string {
		if (!auct) {
			auct = this.auctionProvider.auction;
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
	
	// Create new dealer account
	public createAccount(acct: any) {
		return new Promise((resolve, reject) => {
			this.acctProvider.createAccount(acct, this.apiKey)
			.then((newAccount) => this.loadData().then(() => resolve(newAccount)));
		});
	}
	
	// Create new buyer profile
	public createProfile(prof: any) {
		return new Promise((resolve, reject) => {
			this.profileProvider.createProfile(prof, this.apiKey)
			.then((newUser) => this.loadData().then(() => resolve(newUser)));
		});
	}
	
	// Check if user's account has won the active lot
	public hasWonActiveLot(acctID?: number): boolean {
		if (!acctID) {
			acctID = this.acctProvider.myAccount.id;
		}
		return this.lotProvider.hasWon(acctID);
	}
	
	// Check if user is registered for auction
	public isRegForAuction(auct?: models.Auction): boolean {
		if (!auct) {
			auct = this.auctionProvider.auction;
		}
		console.log(this.profileProvider.profile.auctions);
		return this.auctionProvider.isRegistered(auct, this.profileProvider.profile.auctions);
	}
	
	// Check if user's account is winning the active lot
	public isWinningActiveLot(acctID?: number): boolean {
		if (!acctID) {
			acctID = this.acctProvider.myAccount.id;
		}
		return this.lotProvider.isWinning(acctID);
	}
	
	public loadAuction(auctID: number) {
		return new Promise((resolve, reject) => {
			this.auctionProvider.loadAuction(auctID, this.apiKey)
			.then(
				() => {
					resolve();
				}
			);
		});
	}
	
	// Load charts data
	public loadChartsDataModels() {
		return new Promise((resolve, reject) => {
			this.http.get("https://auctionitapi.azurewebsites.net/api/auctions/" + this.apiKey + "/models")
			.subscribe(
				res => this.chartData.models = res.json(),
				(err) => {},
				() => {
					resolve();
				}
			);
		});
	}
	
	public loadChartsDataStates() {
		return new Promise((resolve, reject) => {
			this.http.get("https://auctionitapi.azurewebsites.net/api/auctions/" + this.apiKey + "/states")
			.subscribe(
				res => this.chartData.states = res.json(),
				(err) => {},
				() => {
					resolve();
				}
			);
		});
	}
	
	public loadChartsDataTypes() {
		return new Promise((resolve, reject) => {
			this.http.get("https://auctionitapi.azurewebsites.net/api/auctions/" + this.apiKey + "/types")
			.subscribe(
				res => this.chartData.types = res.json(),
				(err) => {},
				() => {
					resolve();
				}
			);
		});
	}
	
	// Load data based on user role
	public loadData() {
		return new Promise((resolve, reject) => {
			if (this.loginProvider.creds.role == "user") {
				// The login is for a User
				Promise.all([
					this.acctProvider.loadMyAccount(this.apiKey),
					this.profileProvider.loadMyProfile(this.apiKey)
				]).then(() => 
					this.auctionProvider.loadAllAuctions(this.apiKey, this.role, this.profileProvider.profile.auctions)
				).then(() => 
					resolve()
				);
			}
			else if (this.loginProvider.creds.role == "admin") {
				// The login is for an Admin
				Promise.all([
					this.auctionProvider.loadAllAuctions(this.apiKey, this.role),
					this.acctProvider.loadAllAccounts(this.apiKey)
				]).then(() => 
					this.profileProvider.loadAllProfiles(this.acctProvider.accounts)
				).then(() =>
					resolve()
				);
			}
		});
	}
	
	// Handles login requests
	public login(username: string, password: string) {
		return new Promise((resolve, reject) => {
			this.loginProvider.login(username, password)
			.then(() => {
				if (this.apiKey == null) {
					// The login was invalid and returned an error
					reject(this.loginProvider.creds.error);
				}
				else {
					this.loadData()
					.then(() => {
						if (this.role == "admin") {
							this.loadChartsDataTypes()
							.then(() => resolve());
						}
						else {
							resolve();
						}
					});
				}
			});
		});
	}
	
	// Handles logout and clearing data
	public logout() {
		this.loginProvider.creds = new models.Credentials();
		this.auctionProvider.currentAuction = new models.Auction();
		this.profileProvider.profile = new models.Profile();
	}
	
	// Place new bid
	public placeBid(amount: number) {
		return new Promise((resolve, reject) => {
			this.lotProvider.bidOnLot(amount, this.apiKey)
			.then(
				(result) => {
					resolve(result);
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
		return new Promise((resolve, reject) => {
			this.auctionProvider.loadAuction(this.auctionProvider.auction.id, this.apiKey)
			.then(
				() => {
					resolve();
				}
			);
		});
	}

}
