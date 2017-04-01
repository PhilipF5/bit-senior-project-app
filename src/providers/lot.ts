import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController, AlertController } from 'ionic-angular';
import { AccountProvider } from '../providers/account';
import { AuctionProvider } from '../providers/auction';
import { LoginProvider } from '../providers/login';
import { ProfileProvider } from '../providers/profile';
import 'rxjs/add/operator/map';

/*
  Generated class for the Lot provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class LotProvider {

	loader;

	activeLot = {
		"auctionID": null,
		"bids": [],
		"color": "",
		"detailLink": "",
		"id": 0,
		"make": "",
		"mileage": 0,
		"minPrice": 0,
		"model": "",
		"trim": "",
		"vehicleID": 0,
		"vin": "",
		"year": 0,
		"bidsCount": 0,
		"bidsMax": null,
		"currentPrice": 0,
		"desc": "",
		"status": "",
		"winner": null
	};

	constructor(public http: Http, public acctProvider: AccountProvider, public auctionProvider: AuctionProvider, public loginProvider: LoginProvider, public profileProvider: ProfileProvider, public loadCtrl: LoadingController, public alertCtrl: AlertController) {
		console.log('Hello Lot Provider');
	}
	
	acceptBid()
	{
		this.loader = this.loadCtrl.create({
			content: "Accepting bid..."
		});
		this.loader.present();
		var result;
		return new Promise((resolve, reject) => {
			this.http.get("http://auctionitapi.azurewebsites.net/api/auctions/" + this.loginProvider.creds.apiKey + "/" + this.activeLot.id + "/accept")
			.subscribe(
				res => result = res.json(),
				(err) => {},
				() => {
					this.loader.dismiss();
					let alert = this.alertCtrl.create({
						title: "Bid accepted",
						subTitle: "This lot is now closed.",
						buttons: [
							{
								text: 'OK',
								handler: () => {
									this.loader = this.loadCtrl.create({
										content: "Refreshing..."
									});
									this.loader.present();
									Promise.all([
										this.auctionProvider.loadAllAuctions(),
										this.acctProvider.loadAllAccounts()
										.then(() => this.profileProvider.loadAllProfiles()),
										this.auctionProvider.loadAuction(this.auctionProvider.auction.id)
									]).then(() => {
										for (let lot of this.auctionProvider.auction.lots) {
											if (lot.id == this.activeLot.id) {
												this.activeLot = lot;
											}
										}
										this.loader.dismiss();
										resolve();
									});
								}
							}
						]
					});
					alert.present();
				}
			)
		})
	}
	
	bidOnLot(amount)
	{
		this.loader = this.loadCtrl.create({
      		content: "Sending bid..."
    	});
    	this.loader.present();
		let bidResult = {
			accountID: null,
			amount: 0,
			bidTime: null,
			buyerID: 0,
			id: 0,
			lotID: 0,
			status: ""
		};
		let result = "";
		let message = "";
		return new Promise((resolve, reject) => {
			this.http.get("http://auctionitapi.azurewebsites.net/api/auctions/bid/" + this.loginProvider.creds.apiKey + "/" + this.activeLot.id + "/" + amount)
			.subscribe(
				res => bidResult = res.json(),
				(err) => {},
				() => {
					switch (bidResult.status) {
						case "Placed":
							result = "Bid Placed";
							message = "Your bid has been placed.";
							break;
						case "Low":
							result = "Bid Rejected";
							message = "The current price is higher than your bid.";
							break;
						case "Late":
							result = "Bid Rejected";
							message = "This lot has already closed.";
							break;
						case "Duplicate":
							result = "Bid Rejected";
							message = "Your account is already the highest bidder.";
							break;
						case "Unauthorized":
							result = "Bid Rejected";
							message = "You are not registered to this auction.";
							break;
						case "Bounced":
							result = "Bid Rejected";
							message = "You have insufficient credit to place this bid.";
							break;
						case "Outbid":
						case "Winner":
							break;
						default:
							message = "An unknown error occurred."
							break;
					}
					this.loader.dismiss();
					let alert = this.alertCtrl.create({
						title: result,
						subTitle: message,
						buttons: [
							{
								text: 'OK',
								handler: () => {
									this.loader = this.loadCtrl.create({
										content: "Refreshing..."
									});
									this.loader.present();
									Promise.all([
										this.acctProvider.loadMyAccount(),
										this.profileProvider.loadMyProfile(),
										this.auctionProvider.loadAllAuctions(),
										this.auctionProvider.loadAuction(this.auctionProvider.auction.id)
									]).then(() => {
										for (let lot of this.auctionProvider.auction.lots) {
											if (lot.id == this.activeLot.id) {
												this.activeLot = lot;
											}
										}
										this.loader.dismiss();
										resolve();
									});
								}
							}
						]
					});
					alert.present();
				}
			);
		});
	}

}
