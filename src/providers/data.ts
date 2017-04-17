import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Import all specific providers
import { AccountProvider } from '../providers/account';
import { AuctionProvider } from '../providers/auction';
import { LoginProvider } from '../providers/login';
import { LotProvider } from '../providers/lot';
import { ProfileProvider } from '../providers/profile';

@Injectable()
export class DataProvider {

	constructor(public http: Http, public acctProvider: AccountProvider, public auctionProvider: AuctionProvider, public loginProvider: LoginProvider, public lotProvider: LotProvider, public profileProvider: ProfileProvider) {
		console.log('Hello Data Provider');
	}

}
