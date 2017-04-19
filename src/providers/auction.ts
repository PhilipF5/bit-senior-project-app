import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as moment from 'moment';
import 'moment-timezone';

import * as models from '../app/classes';

@Injectable()
export class AuctionProvider {

	public auction: models.Auction = new models.Auction();
	public auctions: models.Auction[] = [];
	public currentAuction: models.Auction = new models.Auction();

	constructor(public http: Http) {
		
	}
	
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
	
	public loadAllAuctions(apiKey: string, role: string, myAuctions: number[]) {
		return new Promise((resolve, reject) => {
			this.http.get("https://auctionitapi.azurewebsites.net/api/auctions/" + apiKey)
			.subscribe(
				res => {
					this.auctions = res.json();
				},
				(err) => {},
				() => {
					if (role == "user") {
						for (let auct of this.auctions) {
							if (this.isCurrentForUser(auct, myAuctions)) {
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
