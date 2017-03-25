import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoginProvider } from '../providers/login';
import 'rxjs/add/operator/map';

/*
  Generated class for the Auction provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class AuctionProvider {

	auction = {
		
	};
	
	auctions = [];

	constructor(public http: Http, public loginProvider: LoginProvider) {
		
	}
	
	loadAuction(id: number) {
		this.http.get("http://auctionit.azurewebsites.net/api/auctions/" + this.loginProvider.creds.apiKey + "/" + id.toString())
		.subscribe(
			res => this.auction = res.json(),
			(err) => {},
			() => {
				
			}
		)
	}

}
