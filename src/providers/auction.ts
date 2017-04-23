/*
	Auction Provider Service
	========================
	Manages auction-related data.
*/

// Standard service stuff
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Import needed libraries
import * as moment from 'moment';
import 'moment-timezone';
import * as models from '../app/classes';

@Injectable()
export class AuctionProvider {

	// Auction being viewed or accessed
	public auction: models.Auction = new models.Auction();
	// All auctions
	public auctions: models.Auction[] = [];
	// Registered auction in progress (user only)
	public currentAuction: models.Auction = new models.Auction();

	constructor(public http: Http) {
		
	}
	
	// Check timing or registration status of auction
	public isCurrent(auct: models.Auction) {
		return (!this.isUpcoming(auct) && !this.isPast(auct));
	}
	
	public isPast(auct: models.Auction) {
		return moment().isAfter(auct.endTime);
	}
	
	public isRegistered(auct: models.Auction, myAuctions: number[]) {
		return (myAuctions.indexOf(auct.id) != -1);
	}
	
	public isUpcoming(auct: models.Auction) {
		return !(moment().isAfter(auct.startTime));
	}
	
	// Load specific auction from API
	public loadAuction(id: number, apiKey: string) {
		return new Promise((resolve, reject) => {
			this.http.get("https://auctionitapi.azurewebsites.net/api/auctions/" + apiKey + "/" + id)
			.subscribe(
				res => {
					this.auction = res.json();
				},
				(err) => {},
				() => {
					resolve();
				}
			);
		});
	}
	
	// Load all auctions from API
	public loadAllAuctions(apiKey: string, role: string, myAuctions: number[] = []) {
		return new Promise((resolve, reject) => {
			this.http.get("https://auctionitapi.azurewebsites.net/api/auctions/" + apiKey)
			.subscribe(
				res => {
					this.auctions = res.json();
				},
				(err) => {},
				() => {
					// Finding out if we're registered to an auction in progress
					if (role == "user") {
						for (let auct of this.auctions) {
							if (this.isCurrent(auct) && this.isRegistered(auct, myAuctions)) {
								this.currentAuction = auct;
							}
						}
					}
					resolve();
				}
			);
		});
	}

}
