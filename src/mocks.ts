export class ConfigMock {
 
  public get(): any {
    return '';
  }
 
  public getBoolean(): boolean {
    return true;
  }
 
  public getNumber(): number {
    return 1;
  }
}
 
export class FormMock {
  public register(): any {
    return true;
  }
}
 
export class NavMock {
 
  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
 
  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
 
  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }
 
  public setRoot(): any {
    return true;
  }
}
 
export class PlatformMock {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}
 
export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

// Provider Mocks

export class AccountMock {
	public accounts = [ { "address": "7036 Crescent Street", "buyers": [ { "accountID": 1, "auctions": [ 11 ], "bids": [ { "accountID": 1, "amount": 16000.0, "bidTime": "2017-03-14T22:06:24Z", "buyerID": 1, "id": 1, "lotID": 1, "status": "Outbid" }, { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" } ], "bidsMax": 21000.0, "bidsMin": 16000.0, "id": 1, "firstName": "Joel", "lastName": "Helberg", "totalSpent": 21000.0, "username": "user", "auctionCount": 1, "bidsCount": 2, "fullName": "Joel Helberg" } ], "city": "West Lafayette", "contactEmail": "wholesale@shelor.com", "contactPhone": "540-555-1234", "id": 1, "owner": "Shelor Motor Mile", "postalCode": "54637", "stateCode": "IN", "totalCredit": 175000.0, "totalSpent": 21000.0, "usedCredit": 0.0, "availableCredit": 175000.0, "state": "Indiana" }, { "address": "3 Lake View Lane", "buyers": [], "city": "Richmond", "contactEmail": "duncan@hokiehonda.com", "contactPhone": "540-555-5678", "id": 2, "owner": "Duncan\'s Hokie Honda", "postalCode": "24060", "stateCode": "VA", "totalCredit": 225000.0, "totalSpent": 0.0, "usedCredit": 0.0, "availableCredit": 225000.0, "state": "Virginia" }, { "address": "4 Hamilton Ave", "buyers": [ { "accountID": 3, "auctions": [ 11, 3, 6 ], "bids": [ { "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }, { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" } ], "bidsMax": 17000.0, "bidsMin": 12000.0, "id": 2, "firstName": "Kristy", "lastName": "Cooper", "totalSpent": 0.0, "username": "user", "auctionCount": 3, "bidsCount": 2, "fullName": "Kristy Cooper" }, { "accountID": 3, "auctions": [ 11 ], "bids": [ { "accountID": 3, "amount": 21000.0, "bidTime": "2017-03-14T22:06:43Z", "buyerID": 3, "id": 4, "lotID": 2, "status": "Outbid" }, { "accountID": 3, "amount": 20000.0, "bidTime": "2017-03-14T22:11:33Z", "buyerID": 3, "id": 13, "lotID": 5, "status": "Placed" } ], "bidsMax": 21000.0, "bidsMin": 20000.0, "id": 3, "firstName": "Emily", "lastName": "Breslin", "totalSpent": 0.0, "username": "user", "auctionCount": 1, "bidsCount": 2, "fullName": "Emily Breslin" } ], "city": "Charlotte", "contactEmail": "sales@robertson.com", "contactPhone": "302-555-5843", "id": 3, "owner": "Robertson Auto Sales", "postalCode": "49383", "stateCode": "NC", "totalCredit": 145000.0, "totalSpent": 0.0, "usedCredit": 32000.0, "availableCredit": 113000.0, "state": "North Carolina" }, { "address": "621 High Noon Court", "buyers": [ { "accountID": 4, "auctions": [ 11 ], "bids": [ { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" }, { "accountID": 4, "amount": 20000.0, "bidTime": "2017-03-14T22:08:54Z", "buyerID": 4, "id": 9, "lotID": 4, "status": "Outbid" }, { "accountID": 4, "amount": 10000.0, "bidTime": "2017-03-14T22:11:13Z", "buyerID": 4, "id": 15, "lotID": 6, "status": "Placed" } ], "bidsMax": 20000.0, "bidsMin": 10000.0, "id": 4, "firstName": "Ethan", "lastName": "Scarborough", "totalSpent": 18000.0, "username": "user", "auctionCount": 1, "bidsCount": 3, "fullName": "Ethan Scarborough" }, { "accountID": 4, "auctions": [], "bids": [], "bidsMax": 0.0, "bidsMin": 100000.0, "id": 5, "firstName": "Stuart", "lastName": "Devine", "totalSpent": 0.0, "username": "user", "auctionCount": 0, "bidsCount": 0, "fullName": "Stuart Devine" } ], "city": "Clemson", "contactEmail": "dealer@pinkerton.com", "contactPhone": "732-555-9538", "id": 4, "owner": "Pinkerton Chevrolet", "postalCode": "92858", "stateCode": "SC", "totalCredit": 200000.0, "totalSpent": 18000.0, "usedCredit": 10000.0, "availableCredit": 190000.0, "state": "South Carolina" } ];
	
	public myAccount = { "address": "7036 Crescent Street", "city": "West Lafayette", "contactEmail": "wholesale@shelor.com", "contactPhone": "540-555-1234", "id": 1, "owner": "Shelor Motor Mile", "postalCode": "54637", "stateCode": "IN", "totalCredit": 175000.0, "totalSpent": 21000.0, "usedCredit": 0.0, "availableCredit": 175000.0, "state": "Indiana" };
	
	public selectedAcct = 0;
	public selectedAcctID = 1;
	
	public sortBySpent = this.accounts;
	
	public createAccount(acct, apiKey) {
		return new Promise((resolve, reject) => {
			resolve(this.myAccount);
		});
	}
	
	public loadAllAccounts(apiKey) {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
	
	public loadMyAccount(apiKey) {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
}

export class AuctionMock {
	public auction = { "address": "38 Durham St", "city": "Kennesaw", "endTime": "2017-05-03T23:00:00Z", "id": 11, "lots": [ { "auctionID": 11, "bids": [ { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" }, { "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }, { "accountID": 1, "amount": 16000.0, "bidTime": "2017-03-14T22:06:24Z", "buyerID": 1, "id": 1, "lotID": 1, "status": "Outbid" } ], "color": "White", "detailLink": "https://carmaxauctionit.wordpress.com/home/carmax-auction/", "id": 1, "make": "Audi", "mileage": 53000, "minPrice": 16000.0, "model": "A4", "trim": "Premium", "type": "Sedan", "vehicleID": 1, "vin": "19UUA566X1A062669", "year": 2012, "bidsCount": 3, "bidsMax": { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" }, "currentPrice": 18000.0, "desc": "2012 Audi A4 Premium", "status": "Sold", "winner": { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" } }, { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" }, { "accountID": 7, "amount": 22000.0, "bidTime": "2017-03-14T22:10:32Z", "buyerID": 6, "id": 5, "lotID": 2, "status": "Outbid" }, { "accountID": 3, "amount": 21000.0, "bidTime": "2017-03-14T22:06:43Z", "buyerID": 3, "id": 4, "lotID": 2, "status": "Outbid" } ], "color": "Silver", "detailLink": "https://carmaxauctionit.wordpress.com/2011-bmw-335/", "id": 2, "make": "BMW", "mileage": 63000, "minPrice": 21000.0, "model": "335", "trim": "", "type": "Coupe", "vehicleID": 2, "vin": "1GBHK34FXRE222238", "year": 2011, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" }, "currentPrice": 23000.0, "desc": "2011 BMW 335 ", "status": "Unsold", "winner": null }, { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, { "accountID": 10, "amount": 11000.0, "bidTime": "2017-03-14T22:08:13Z", "buyerID": 10, "id": 7, "lotID": 3, "status": "Outbid" }, { "accountID": 7, "amount": 10000.0, "bidTime": "2017-03-14T22:07:24Z", "buyerID": 8, "id": 6, "lotID": 3, "status": "Outbid" } ], "color": "Gray", "detailLink": "https://carmaxauctionit.wordpress.com/2011-honda-accord/", "id": 3, "make": "Honda", "mileage": 73000, "minPrice": 10000.0, "model": "Accord", "trim": "EX", "type": "Sedan", "vehicleID": 3, "vin": "1N6ED26Y84C422344", "year": 2011, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, "currentPrice": 12000.0, "desc": "2011 Honda Accord EX", "status": "Unsold", "winner": null }, { "auctionID": 11, "bids": [ { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" }, { "accountID": 4, "amount": 20000.0, "bidTime": "2017-03-14T22:08:54Z", "buyerID": 4, "id": 9, "lotID": 4, "status": "Outbid" } ], "color": "Brown", "detailLink": "https://carmaxauctionit.wordpress.com/2013-honda-pilot-lx/", "id": 4, "make": "Honda", "mileage": 42000, "minPrice": 20000.0, "model": "Pilot", "trim": "LX", "type": "Crossover", "vehicleID": 4, "vin": "JT8UF11E2N0138449", "year": 2013, "bidsCount": 2, "bidsMax": { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" }, "currentPrice": 21000.0, "desc": "2013 Honda Pilot LX", "status": "Sold", "winner": { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" } }, { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 20000.0, "bidTime": "2017-03-14T22:11:33Z", "buyerID": 3, "id": 13, "lotID": 5, "status": "Placed" }, { "accountID": 7, "amount": 19000.0, "bidTime": "2017-03-14T22:11:05Z", "buyerID": 6, "id": 12, "lotID": 5, "status": "Outbid" }, { "accountID": 10, "amount": 18000.0, "bidTime": "2017-03-14T22:09:48Z", "buyerID": 10, "id": 11, "lotID": 5, "status": "Outbid" } ], "color": "Gray", "detailLink": "https://carmaxauctionit.wordpress.com/2014-hyundai-genesis-premiun/", "id": 5, "make": "Hyundai", "mileage": 19000, "minPrice": 18000.0, "model": "Genesis", "trim": "Premium", "type": "Coupe", "vehicleID": 5, "vin": "1GT120E8XFF595149", "year": 2014, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 20000.0, "bidTime": "2017-03-14T22:11:33Z", "buyerID": 3, "id": 13, "lotID": 5, "status": "Placed" }, "currentPrice": 20000.0, "desc": "2014 Hyundai Genesis Premium", "status": "Unsold", "winner": null }, { "auctionID": 11, "bids": [ { "accountID": 4, "amount": 10000.0, "bidTime": "2017-03-14T22:11:13Z", "buyerID": 4, "id": 15, "lotID": 6, "status": "Placed" }, { "accountID": 7, "amount": 9000.0, "bidTime": "2017-03-14T22:10:01Z", "buyerID": 8, "id": 14, "lotID": 6, "status": "Outbid" } ], "color": "Green", "detailLink": "https://carmaxauctionit.wordpress.com/2009-toyota-camry-xle/", "id": 6, "make": "Toyota", "mileage": 118000, "minPrice": 9000.0, "model": "Camry", "trim": "XLE", "type": "Sedan", "vehicleID": 6, "vin": "1GYS4EEJ5CR391166", "year": 2009, "bidsCount": 2, "bidsMax": { "accountID": 4, "amount": 10000.0, "bidTime": "2017-03-14T22:11:13Z", "buyerID": 4, "id": 15, "lotID": 6, "status": "Placed" }, "currentPrice": 10000.0, "desc": "2009 Toyota Camry XLE", "status": "Unsold", "winner": null } ], "participants": 7, "postalCode": "30144", "startTime": "2017-03-01T13:00:00Z", "stateCode": "GA", "state": "Georgia" };
	
	public auctions = [ { "address": "40 Galvin Ave", "city": "Chapel Hill", "endTime": "2016-04-07T21:00:00Z", "id": 1, "lots": [], "participants": 0, "postalCode": "27516", "startTime": "2016-04-07T19:30:00Z", "stateCode": "NC", "state": "North Carolina" }, { "address": "38 Durham St", "city": "Kennesaw", "endTime": "2016-04-18T23:30:00Z", "id": 2, "lots": [], "participants": 0, "postalCode": "30144", "startTime": "2016-04-18T22:00:00Z", "stateCode": "GA", "state": "Georgia" }, { "address": "74 Cypress Ave", "city": "Oxon Hill", "endTime": "2016-05-30T16:00:00Z", "id": 3, "lots": [ { "auctionID": 3, "bids": [], "color": "Black", "detailLink": "", "id": 7, "make": "Ford", "mileage": 65000, "minPrice": 13000.0, "model": "Expedition", "trim": "XLT", "type": "SUV", "vehicleID": 7, "vin": "1FAHP3835YW398545", "year": 2008, "bidsCount": 0, "bidsMax": null, "currentPrice": 13000.0, "desc": "2008 Ford Expedition XLT", "status": "Unsold", "winner": null }, { "auctionID": 3, "bids": [], "color": "White", "detailLink": "", "id": 8, "make": "Toyota", "mileage": 75000, "minPrice": 15000.0, "model": "Sienna", "trim": "LE AWD", "type": "Minivan", "vehicleID": 8, "vin": "1G3AM27E8ED314985", "year": 2010, "bidsCount": 0, "bidsMax": null, "currentPrice": 15000.0, "desc": "2010 Toyota Sienna LE AWD", "status": "Unsold", "winner": null } ], "participants": 1, "postalCode": "20745", "startTime": "2016-05-30T13:00:00Z", "stateCode": "MD", "state": "Maryland" }, { "address": "8950 Birchwood St", "city": "Forney", "endTime": "2016-09-15T19:00:00Z", "id": 4, "lots": [], "participants": 0, "postalCode": "75126", "startTime": "2016-09-15T17:00:00Z", "stateCode": "TX", "state": "Texas" }, { "address": "774 N Country Street", "city": "Fort Lee", "endTime": "2016-09-15T23:00:00Z", "id": 5, "lots": [], "participants": 0, "postalCode": "07024", "startTime": "2016-09-15T21:00:00Z", "stateCode": "NJ", "state": "New Jersey" }, { "address": "482 South 8th Lane", "city": "Buffalo Grove", "endTime": "2016-12-21T16:30:00Z", "id": 6, "lots": [ { "auctionID": 6, "bids": [], "color": "Tan", "detailLink": "", "id": 9, "make": "Toyota", "mileage": 45000, "minPrice": 11000.0, "model": "Camry", "trim": "SE", "type": "Sedan", "vehicleID": 9, "vin": "JA3215H4XEU081128", "year": 2014, "bidsCount": 0, "bidsMax": null, "currentPrice": 11000.0, "desc": "2014 Toyota Camry SE", "status": "Unsold", "winner": null }, { "auctionID": 6, "bids": [], "color": "Royal Blue", "detailLink": "", "id": 10, "make": "Ford", "mileage": 25000, "minPrice": 17000.0, "model": "Fusion", "trim": "S", "type": "Sedan", "vehicleID": 10, "vin": "JS3TX92V514126372", "year": 2015, "bidsCount": 0, "bidsMax": null, "currentPrice": 17000.0, "desc": "2015 Ford Fusion S", "status": "Unsold", "winner": null } ], "participants": 1, "postalCode": "60089", "startTime": "2016-12-21T15:00:00Z", "stateCode": "IL", "state": "Illinois" }, { "address": "38 Durham St", "city": "Kennesaw", "endTime": "2017-05-03T23:00:00Z", "id": 11, "lots": [ { "auctionID": 11, "bids": [ { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" }, { "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }, { "accountID": 1, "amount": 16000.0, "bidTime": "2017-03-14T22:06:24Z", "buyerID": 1, "id": 1, "lotID": 1, "status": "Outbid" } ], "color": "White", "detailLink": "https://carmaxauctionit.wordpress.com/home/carmax-auction/", "id": 1, "make": "Audi", "mileage": 53000, "minPrice": 16000.0, "model": "A4", "trim": "Premium", "type": "Sedan", "vehicleID": 1, "vin": "19UUA566X1A062669", "year": 2012, "bidsCount": 3, "bidsMax": { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" }, "currentPrice": 18000.0, "desc": "2012 Audi A4 Premium", "status": "Sold", "winner": { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" } }, { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" }, { "accountID": 7, "amount": 22000.0, "bidTime": "2017-03-14T22:10:32Z", "buyerID": 6, "id": 5, "lotID": 2, "status": "Outbid" }, { "accountID": 3, "amount": 21000.0, "bidTime": "2017-03-14T22:06:43Z", "buyerID": 3, "id": 4, "lotID": 2, "status": "Outbid" } ], "color": "Silver", "detailLink": "https://carmaxauctionit.wordpress.com/2011-bmw-335/", "id": 2, "make": "BMW", "mileage": 63000, "minPrice": 21000.0, "model": "335", "trim": "", "type": "Coupe", "vehicleID": 2, "vin": "1GBHK34FXRE222238", "year": 2011, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" }, "currentPrice": 23000.0, "desc": "2011 BMW 335 ", "status": "Unsold", "winner": null }, { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, { "accountID": 10, "amount": 11000.0, "bidTime": "2017-03-14T22:08:13Z", "buyerID": 10, "id": 7, "lotID": 3, "status": "Outbid" }, { "accountID": 7, "amount": 10000.0, "bidTime": "2017-03-14T22:07:24Z", "buyerID": 8, "id": 6, "lotID": 3, "status": "Outbid" } ], "color": "Gray", "detailLink": "https://carmaxauctionit.wordpress.com/2011-honda-accord/", "id": 3, "make": "Honda", "mileage": 73000, "minPrice": 10000.0, "model": "Accord", "trim": "EX", "type": "Sedan", "vehicleID": 3, "vin": "1N6ED26Y84C422344", "year": 2011, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, "currentPrice": 12000.0, "desc": "2011 Honda Accord EX", "status": "Unsold", "winner": null }, { "auctionID": 11, "bids": [ { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" }, { "accountID": 4, "amount": 20000.0, "bidTime": "2017-03-14T22:08:54Z", "buyerID": 4, "id": 9, "lotID": 4, "status": "Outbid" } ], "color": "Brown", "detailLink": "https://carmaxauctionit.wordpress.com/2013-honda-pilot-lx/", "id": 4, "make": "Honda", "mileage": 42000, "minPrice": 20000.0, "model": "Pilot", "trim": "LX", "type": "Crossover", "vehicleID": 4, "vin": "JT8UF11E2N0138449", "year": 2013, "bidsCount": 2, "bidsMax": { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" }, "currentPrice": 21000.0, "desc": "2013 Honda Pilot LX", "status": "Sold", "winner": { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" } }, { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 20000.0, "bidTime": "2017-03-14T22:11:33Z", "buyerID": 3, "id": 13, "lotID": 5, "status": "Placed" }, { "accountID": 7, "amount": 19000.0, "bidTime": "2017-03-14T22:11:05Z", "buyerID": 6, "id": 12, "lotID": 5, "status": "Outbid" }, { "accountID": 10, "amount": 18000.0, "bidTime": "2017-03-14T22:09:48Z", "buyerID": 10, "id": 11, "lotID": 5, "status": "Outbid" } ], "color": "Gray", "detailLink": "https://carmaxauctionit.wordpress.com/2014-hyundai-genesis-premiun/", "id": 5, "make": "Hyundai", "mileage": 19000, "minPrice": 18000.0, "model": "Genesis", "trim": "Premium", "type": "Coupe", "vehicleID": 5, "vin": "1GT120E8XFF595149", "year": 2014, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 20000.0, "bidTime": "2017-03-14T22:11:33Z", "buyerID": 3, "id": 13, "lotID": 5, "status": "Placed" }, "currentPrice": 20000.0, "desc": "2014 Hyundai Genesis Premium", "status": "Unsold", "winner": null }, { "auctionID": 11, "bids": [ { "accountID": 4, "amount": 10000.0, "bidTime": "2017-03-14T22:11:13Z", "buyerID": 4, "id": 15, "lotID": 6, "status": "Placed" }, { "accountID": 7, "amount": 9000.0, "bidTime": "2017-03-14T22:10:01Z", "buyerID": 8, "id": 14, "lotID": 6, "status": "Outbid" } ], "color": "Green", "detailLink": "https://carmaxauctionit.wordpress.com/2009-toyota-camry-xle/", "id": 6, "make": "Toyota", "mileage": 118000, "minPrice": 9000.0, "model": "Camry", "trim": "XLE", "type": "Sedan", "vehicleID": 6, "vin": "1GYS4EEJ5CR391166", "year": 2009, "bidsCount": 2, "bidsMax": { "accountID": 4, "amount": 10000.0, "bidTime": "2017-03-14T22:11:13Z", "buyerID": 4, "id": 15, "lotID": 6, "status": "Placed" }, "currentPrice": 10000.0, "desc": "2009 Toyota Camry XLE", "status": "Unsold", "winner": null } ], "participants": 7, "postalCode": "30144", "startTime": "2017-03-01T13:00:00Z", "stateCode": "GA", "state": "Georgia" }, { "address": "763 High Ave", "city": "Cockeysville", "endTime": "2017-03-01T16:00:00Z", "id": 7, "lots": [], "participants": 0, "postalCode": "21030", "startTime": "2017-03-01T14:30:00Z", "stateCode": "MD", "state": "Maryland" }, { "address": "664 Atlantic Street", "city": "West Springfield", "endTime": "2017-06-01T18:30:00Z", "id": 8, "lots": [], "participants": 0, "postalCode": "01089", "startTime": "2017-06-01T17:00:00Z", "stateCode": "MA", "state": "Massachusetts" }, { "address": "8244 Mill Rd", "city": "Benton Harbor", "endTime": "2017-06-15T15:00:00Z", "id": 9, "lots": [], "participants": 0, "postalCode": "49022", "startTime": "2017-06-15T13:00:00Z", "stateCode": "MI", "state": "Michigan" }, { "address": "7062 Kingston St", "city": "Georgetown", "endTime": "2017-08-14T21:00:00Z", "id": 10, "lots": [], "participants": 0, "postalCode": "29440", "startTime": "2017-08-14T19:00:00Z", "stateCode": "SC", "state": "South Carolina" } ];
	
	public currentAuction = this.auction;
	
	public isCurrent(auct) {
		return true;
	}
	
	public isPast(auct) {
		return false;
	}
	
	public isRegistered(auct) {
		return true;
	}
	
	public isUpcoming(auct) {
		return false;
	}
	
	public loadAuction(id, apiKey) {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
	
	public loadAllAuctions(apiKey, role, myAuctions = []) {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
}

export class LoginMock {
	public creds = { "apiKey": "8f830g8e8fv8eb", "error": null, "firstName": "Kristy", "lastName": "Cooper", "role": "user", "username": "kristyc" };
	
	public login(username, password) {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
}

export class LotMock {
	public activeLot = { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" }, { "accountID": 7, "amount": 22000.0, "bidTime": "2017-03-14T22:10:32Z", "buyerID": 6, "id": 5, "lotID": 2, "status": "Outbid" }, { "accountID": 3, "amount": 21000.0, "bidTime": "2017-03-14T22:06:43Z", "buyerID": 3, "id": 4, "lotID": 2, "status": "Outbid" } ], "color": "Silver", "detailLink": "https://carmaxauctionit.wordpress.com/2011-bmw-335/", "id": 2, "make": "BMW", "mileage": 63000, "minPrice": 21000.0, "model": "335", "trim": "", "type": "Coupe", "vehicleID": 2, "vin": "1GBHK34FXRE222238", "year": 2011, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" }, "currentPrice": 23000.0, "desc": "2011 BMW 335 ", "status": "Unsold", "winner": null };
	
	public acceptBid(apiKey) {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
	
	public bidOnLot(amount, apiKey) {
		return new Promise((resolve, reject) => {
			resolve({title: "Bid Placed", subtitle: "Your bid has been placed."});
		})
	}
	
	public hasWon(acctID) {
		return true;
	}
	
	public isWinning(acctID) {
		return true;
	}
}

export class ProfileMock {
	public profile = { "accountID": 3, "auctions": [ 11, 3, 6 ], "bids": [ { "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }, { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" } ], "bidsMax": 23000.0, "bidsMin": 12000.0, "id": 2, "firstName": "Kristy", "lastName": "Cooper", "totalSpent": 0.0, "username": "kristyc", "auctionCount": 3, "bidsCount": 3, "fullName": "Kristy Cooper" };
	
	public profiles = [ { "accountID": 3, "auctions": [ 11, 3, 6 ], "bids": [ { "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }, { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" } ], "bidsMax": 23000.0, "bidsMin": 12000.0, "id": 2, "firstName": "Kristy", "lastName": "Cooper", "totalSpent": 0.0, "username": "kristyc", "auctionCount": 3, "bidsCount": 3, "fullName": "Kristy Cooper" }, { "accountID": 3, "auctions": [ 11, 3, 6 ], "bids": [ { "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }, { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" } ], "bidsMax": 23000.0, "bidsMin": 12000.0, "id": 2, "firstName": "Kristy", "lastName": "Cooper", "totalSpent": 0.0, "username": "kristyc", "auctionCount": 3, "bidsCount": 3, "fullName": "Kristy Cooper" }, { "accountID": 3, "auctions": [ 11, 3, 6 ], "bids": [ { "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }, { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" } ], "bidsMax": 23000.0, "bidsMin": 12000.0, "id": 2, "firstName": "Kristy", "lastName": "Cooper", "totalSpent": 0.0, "username": "kristyc", "auctionCount": 3, "bidsCount": 3, "fullName": "Kristy Cooper" } ];
	
	public sortBySpent = this.profiles;
	
	public wins = 2;
	
	public createProfile(prof, apiKey) {
		return new Promise((resolve, reject) => {
			resolve(this.profile);
		});
	}
	
	public loadAllProfiles(apiKey) {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
	
	public loadMyProfile(apiKey) {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
}
