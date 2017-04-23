/*
	Lot Provider Service
	========================
	Manages lot-related data.
*/

// Standard service stuff
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Import needed libraries
import * as models from '../app/classes';

@Injectable()
export class LotProvider {
	
	// Lot being viewed or accessed
	public activeLot: models.Lot = new models.Lot();

	constructor(public http: Http) {
		
	}
	
	// Accept current bid as the winner
	public acceptBid(apiKey: string) {
		return new Promise((resolve, reject) => {
			let result: any;
			this.http.get("https://auctionitapi.azurewebsites.net/api/auctions/" + apiKey + "/" + this.activeLot.id + "/accept")
			.subscribe(
				res => result = res.json(),
				(err) => {},
				() => {
					resolve();
				}
			)
		})
	}
	
	// Place a new bid
	public bidOnLot(amount: number, apiKey: string) {
		return new Promise((resolve, reject) => {
			let bidResult: models.Bid;
			let result: string;
			let message: string;
			this.http.get("https://auctionitapi.azurewebsites.net/api/auctions/bid/" + apiKey + "/" + this.activeLot.id + "/" + amount)
			.subscribe(
				res => bidResult = res.json(),
				(err) => {},
				() => {
					// Handle the result returned by the API
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
							reject(message);
							break;
					}
					resolve({title: result, subtitle: message});
				}
			);
		});
	}
	
	// Check if account has won the lot
	public hasWon(acctID: number) {
		if (this.activeLot.bidsCount > 0 && this.activeLot.status == "Sold") {
			if (this.activeLot.bidsMax.accountID == acctID) {
				return true;
			}
		}
		return false;
	}
	
	// Check if account has the highest valid bid
	public isWinning(acctID: number) {
		if (this.activeLot.bidsCount > 0 && this.activeLot.status == "Unsold") {
			if (this.activeLot.bidsMax.accountID == acctID) {
				return true;
			}
		}
		return false;
	}

}
