/*
	Auction Provider Tests
*/

// Standard test stuff
import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Import the service to test
import { AuctionProvider } from "./auction";

describe("Auction Provider Service", () => {

	// Set up mock HTTP service
	beforeEach(() => {
		TestBed.configureTestingModule({
            declarations: [],
            providers: [
                AuctionProvider,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http, 
                    useFactory: (mockBackend, options) => {
                        return new Http(mockBackend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }
            ],
            imports: [
                HttpModule
            ]
        }).compileComponents();
	});
	
	// Test isCurrent()
	it("should consider Auction 11 to be current", inject([AuctionProvider, MockBackend], (auctionProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockCurrentAuction
            })));
        });
 		// Run function to test
        auctionProvider.loadAuction(11, "apiKey");
		// auction property should hold a current auction
        expect(auctionProvider.isCurrent(auctionProvider.auction)).toBeTruthy();
	}));
	
	// Test isPast()
	it("should consider Auction 4 to be past", inject([AuctionProvider, MockBackend], (auctionProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockPastAuction
            })));
        });
 		// Run function to test
        auctionProvider.loadAuction(4, "apiKey");
		// auction property should hold a current auction
        expect(auctionProvider.isPast(auctionProvider.auction)).toBeTruthy();
	}));
	
	// Test isRegistered()
	it("should consider Auction 11 to be registered", inject([AuctionProvider, MockBackend], (auctionProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockCurrentAuction
            })));
        });
 		// Run function to test
        auctionProvider.loadAuction(11, "apiKey");
		// auction property should hold a current auction
        expect(auctionProvider.isRegistered(auctionProvider.auction, [11, 3, 6])).toBeTruthy();
	}));
	
	// Test isUpcoming()
	it("should consider Auction 10 to be upcoming", inject([AuctionProvider, MockBackend], (auctionProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockFutureAuction
            })));
        });
 		// Run function to test
        auctionProvider.loadAuction(10, "apiKey");
		// auction property should hold a current auction
        expect(auctionProvider.isUpcoming(auctionProvider.auction)).toBeTruthy();
	}));
	
	// Test loadAuction()
	it("should load a single auction object", inject([AuctionProvider, MockBackend], (auctionProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockCurrentAuction
            })));
        });
 		// Run function to test
        auctionProvider.loadAuction(11, "apiKey");
		// auction property should hold an auction
        expect(auctionProvider.auction).toBeTruthy();
	}));
	
	// Test loadAllAuctions()
	it("should load an array of auction objects", inject([AuctionProvider, MockBackend], (auctionProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockAllAuctions
            })));
        });
 		// Run function to test
        auctionProvider.loadAllAuctions("apiKey", "user");
		// auctions property should hold an array of auctions
        expect(Array.isArray(auctionProvider.auctions)).toBeTruthy();
		// Array should not be empty
		expect(auctionProvider.auctions.length).toBeGreaterThan(0);
	}));
	
	it("should recognize Auction 11 as the current auction", inject([AuctionProvider, MockBackend], (auctionProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockAllAuctions
            })));
        });
 		// Run function to test
        auctionProvider.loadAllAuctions("apiKey", "user", [11, 3, 6]);
		// currentAuction property should hold Auction 11
        expect(auctionProvider.currentAuction.id).toBe(11);
	}));
	
	// SAMPLE JSON -------------------------------------
	
	// Sample JSON for Get All Auctions as buyer
	const mockAllAuctions = '[ { "address": "40 Galvin Ave", "city": "Chapel Hill", "endTime": "2016-04-07T21:00:00Z", "id": 1, "lots": [], "participants": 0, "postalCode": "27516", "startTime": "2016-04-07T19:30:00Z", "stateCode": "NC", "state": "North Carolina" }, { "address": "38 Durham St", "city": "Kennesaw", "endTime": "2016-04-18T23:30:00Z", "id": 2, "lots": [], "participants": 0, "postalCode": "30144", "startTime": "2016-04-18T22:00:00Z", "stateCode": "GA", "state": "Georgia" }, { "address": "74 Cypress Ave", "city": "Oxon Hill", "endTime": "2016-05-30T16:00:00Z", "id": 3, "lots": [ { "auctionID": 3, "bids": [], "color": "Black", "detailLink": "", "id": 7, "make": "Ford", "mileage": 65000, "minPrice": 13000.0, "model": "Expedition", "trim": "XLT", "type": "SUV", "vehicleID": 7, "vin": "1FAHP3835YW398545", "year": 2008, "bidsCount": 0, "bidsMax": null, "currentPrice": 13000.0, "desc": "2008 Ford Expedition XLT", "status": "Unsold", "winner": null }, { "auctionID": 3, "bids": [], "color": "White", "detailLink": "", "id": 8, "make": "Toyota", "mileage": 75000, "minPrice": 15000.0, "model": "Sienna", "trim": "LE AWD", "type": "Minivan", "vehicleID": 8, "vin": "1G3AM27E8ED314985", "year": 2010, "bidsCount": 0, "bidsMax": null, "currentPrice": 15000.0, "desc": "2010 Toyota Sienna LE AWD", "status": "Unsold", "winner": null } ], "participants": 1, "postalCode": "20745", "startTime": "2016-05-30T13:00:00Z", "stateCode": "MD", "state": "Maryland" }, { "address": "8950 Birchwood St", "city": "Forney", "endTime": "2016-09-15T19:00:00Z", "id": 4, "lots": [], "participants": 0, "postalCode": "75126", "startTime": "2016-09-15T17:00:00Z", "stateCode": "TX", "state": "Texas" }, { "address": "774 N Country Street", "city": "Fort Lee", "endTime": "2016-09-15T23:00:00Z", "id": 5, "lots": [], "participants": 0, "postalCode": "07024", "startTime": "2016-09-15T21:00:00Z", "stateCode": "NJ", "state": "New Jersey" }, { "address": "482 South 8th Lane", "city": "Buffalo Grove", "endTime": "2016-12-21T16:30:00Z", "id": 6, "lots": [ { "auctionID": 6, "bids": [], "color": "Tan", "detailLink": "", "id": 9, "make": "Toyota", "mileage": 45000, "minPrice": 11000.0, "model": "Camry", "trim": "SE", "type": "Sedan", "vehicleID": 9, "vin": "JA3215H4XEU081128", "year": 2014, "bidsCount": 0, "bidsMax": null, "currentPrice": 11000.0, "desc": "2014 Toyota Camry SE", "status": "Unsold", "winner": null }, { "auctionID": 6, "bids": [], "color": "Royal Blue", "detailLink": "", "id": 10, "make": "Ford", "mileage": 25000, "minPrice": 17000.0, "model": "Fusion", "trim": "S", "type": "Sedan", "vehicleID": 10, "vin": "JS3TX92V514126372", "year": 2015, "bidsCount": 0, "bidsMax": null, "currentPrice": 17000.0, "desc": "2015 Ford Fusion S", "status": "Unsold", "winner": null } ], "participants": 1, "postalCode": "60089", "startTime": "2016-12-21T15:00:00Z", "stateCode": "IL", "state": "Illinois" }, { "address": "38 Durham St", "city": "Kennesaw", "endTime": "2017-05-03T23:00:00Z", "id": 11, "lots": [ { "auctionID": 11, "bids": [ { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" }, { "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }, { "accountID": 1, "amount": 16000.0, "bidTime": "2017-03-14T22:06:24Z", "buyerID": 1, "id": 1, "lotID": 1, "status": "Outbid" } ], "color": "White", "detailLink": "https://carmaxauctionit.wordpress.com/home/carmax-auction/", "id": 1, "make": "Audi", "mileage": 53000, "minPrice": 16000.0, "model": "A4", "trim": "Premium", "type": "Sedan", "vehicleID": 1, "vin": "19UUA566X1A062669", "year": 2012, "bidsCount": 3, "bidsMax": { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" }, "currentPrice": 18000.0, "desc": "2012 Audi A4 Premium", "status": "Sold", "winner": { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" } }, { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" }, { "accountID": 7, "amount": 22000.0, "bidTime": "2017-03-14T22:10:32Z", "buyerID": 6, "id": 5, "lotID": 2, "status": "Outbid" }, { "accountID": 3, "amount": 21000.0, "bidTime": "2017-03-14T22:06:43Z", "buyerID": 3, "id": 4, "lotID": 2, "status": "Outbid" } ], "color": "Silver", "detailLink": "https://carmaxauctionit.wordpress.com/2011-bmw-335/", "id": 2, "make": "BMW", "mileage": 63000, "minPrice": 21000.0, "model": "335", "trim": "", "type": "Coupe", "vehicleID": 2, "vin": "1GBHK34FXRE222238", "year": 2011, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" }, "currentPrice": 23000.0, "desc": "2011 BMW 335 ", "status": "Unsold", "winner": null }, { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, { "accountID": 10, "amount": 11000.0, "bidTime": "2017-03-14T22:08:13Z", "buyerID": 10, "id": 7, "lotID": 3, "status": "Outbid" }, { "accountID": 7, "amount": 10000.0, "bidTime": "2017-03-14T22:07:24Z", "buyerID": 8, "id": 6, "lotID": 3, "status": "Outbid" } ], "color": "Gray", "detailLink": "https://carmaxauctionit.wordpress.com/2011-honda-accord/", "id": 3, "make": "Honda", "mileage": 73000, "minPrice": 10000.0, "model": "Accord", "trim": "EX", "type": "Sedan", "vehicleID": 3, "vin": "1N6ED26Y84C422344", "year": 2011, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, "currentPrice": 12000.0, "desc": "2011 Honda Accord EX", "status": "Unsold", "winner": null }, { "auctionID": 11, "bids": [ { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" }, { "accountID": 4, "amount": 20000.0, "bidTime": "2017-03-14T22:08:54Z", "buyerID": 4, "id": 9, "lotID": 4, "status": "Outbid" } ], "color": "Brown", "detailLink": "https://carmaxauctionit.wordpress.com/2013-honda-pilot-lx/", "id": 4, "make": "Honda", "mileage": 42000, "minPrice": 20000.0, "model": "Pilot", "trim": "LX", "type": "Crossover", "vehicleID": 4, "vin": "JT8UF11E2N0138449", "year": 2013, "bidsCount": 2, "bidsMax": { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" }, "currentPrice": 21000.0, "desc": "2013 Honda Pilot LX", "status": "Sold", "winner": { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" } }, { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 20000.0, "bidTime": "2017-03-14T22:11:33Z", "buyerID": 3, "id": 13, "lotID": 5, "status": "Placed" }, { "accountID": 7, "amount": 19000.0, "bidTime": "2017-03-14T22:11:05Z", "buyerID": 6, "id": 12, "lotID": 5, "status": "Outbid" }, { "accountID": 10, "amount": 18000.0, "bidTime": "2017-03-14T22:09:48Z", "buyerID": 10, "id": 11, "lotID": 5, "status": "Outbid" } ], "color": "Gray", "detailLink": "https://carmaxauctionit.wordpress.com/2014-hyundai-genesis-premiun/", "id": 5, "make": "Hyundai", "mileage": 19000, "minPrice": 18000.0, "model": "Genesis", "trim": "Premium", "type": "Coupe", "vehicleID": 5, "vin": "1GT120E8XFF595149", "year": 2014, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 20000.0, "bidTime": "2017-03-14T22:11:33Z", "buyerID": 3, "id": 13, "lotID": 5, "status": "Placed" }, "currentPrice": 20000.0, "desc": "2014 Hyundai Genesis Premium", "status": "Unsold", "winner": null }, { "auctionID": 11, "bids": [ { "accountID": 4, "amount": 10000.0, "bidTime": "2017-03-14T22:11:13Z", "buyerID": 4, "id": 15, "lotID": 6, "status": "Placed" }, { "accountID": 7, "amount": 9000.0, "bidTime": "2017-03-14T22:10:01Z", "buyerID": 8, "id": 14, "lotID": 6, "status": "Outbid" } ], "color": "Green", "detailLink": "https://carmaxauctionit.wordpress.com/2009-toyota-camry-xle/", "id": 6, "make": "Toyota", "mileage": 118000, "minPrice": 9000.0, "model": "Camry", "trim": "XLE", "type": "Sedan", "vehicleID": 6, "vin": "1GYS4EEJ5CR391166", "year": 2009, "bidsCount": 2, "bidsMax": { "accountID": 4, "amount": 10000.0, "bidTime": "2017-03-14T22:11:13Z", "buyerID": 4, "id": 15, "lotID": 6, "status": "Placed" }, "currentPrice": 10000.0, "desc": "2009 Toyota Camry XLE", "status": "Unsold", "winner": null } ], "participants": 7, "postalCode": "30144", "startTime": "2017-03-01T13:00:00Z", "stateCode": "GA", "state": "Georgia" }, { "address": "763 High Ave", "city": "Cockeysville", "endTime": "2017-03-01T16:00:00Z", "id": 7, "lots": [], "participants": 0, "postalCode": "21030", "startTime": "2017-03-01T14:30:00Z", "stateCode": "MD", "state": "Maryland" }, { "address": "664 Atlantic Street", "city": "West Springfield", "endTime": "2017-06-01T18:30:00Z", "id": 8, "lots": [], "participants": 0, "postalCode": "01089", "startTime": "2017-06-01T17:00:00Z", "stateCode": "MA", "state": "Massachusetts" }, { "address": "8244 Mill Rd", "city": "Benton Harbor", "endTime": "2017-06-15T15:00:00Z", "id": 9, "lots": [], "participants": 0, "postalCode": "49022", "startTime": "2017-06-15T13:00:00Z", "stateCode": "MI", "state": "Michigan" }, { "address": "7062 Kingston St", "city": "Georgetown", "endTime": "2017-08-14T21:00:00Z", "id": 10, "lots": [], "participants": 0, "postalCode": "29440", "startTime": "2017-08-14T19:00:00Z", "stateCode": "SC", "state": "South Carolina" } ]';
	
	// Sample JSON for Get Auction 11
	const mockCurrentAuction = '{ "address": "38 Durham St", "city": "Kennesaw", "endTime": "2017-05-03T23:00:00Z", "id": 11, "lots": [ { "auctionID": 11, "bids": [ { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" }, { "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }, { "accountID": 1, "amount": 16000.0, "bidTime": "2017-03-14T22:06:24Z", "buyerID": 1, "id": 1, "lotID": 1, "status": "Outbid" } ], "color": "White", "detailLink": "https://carmaxauctionit.wordpress.com/home/carmax-auction/", "id": 1, "make": "Audi", "mileage": 53000, "minPrice": 16000.0, "model": "A4", "trim": "Premium", "type": "Sedan", "vehicleID": 1, "vin": "19UUA566X1A062669", "year": 2012, "bidsCount": 3, "bidsMax": { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" }, "currentPrice": 18000.0, "desc": "2012 Audi A4 Premium", "status": "Sold", "winner": { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" } }, { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" }, { "accountID": 7, "amount": 22000.0, "bidTime": "2017-03-14T22:10:32Z", "buyerID": 6, "id": 5, "lotID": 2, "status": "Outbid" }, { "accountID": 3, "amount": 21000.0, "bidTime": "2017-03-14T22:06:43Z", "buyerID": 3, "id": 4, "lotID": 2, "status": "Outbid" } ], "color": "Silver", "detailLink": "https://carmaxauctionit.wordpress.com/2011-bmw-335/", "id": 2, "make": "BMW", "mileage": 63000, "minPrice": 21000.0, "model": "335", "trim": "", "type": "Coupe", "vehicleID": 2, "vin": "1GBHK34FXRE222238", "year": 2011, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" }, "currentPrice": 23000.0, "desc": "2011 BMW 335 ", "status": "Unsold", "winner": null }, { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, { "accountID": 10, "amount": 11000.0, "bidTime": "2017-03-14T22:08:13Z", "buyerID": 10, "id": 7, "lotID": 3, "status": "Outbid" }, { "accountID": 7, "amount": 10000.0, "bidTime": "2017-03-14T22:07:24Z", "buyerID": 8, "id": 6, "lotID": 3, "status": "Outbid" } ], "color": "Gray", "detailLink": "https://carmaxauctionit.wordpress.com/2011-honda-accord/", "id": 3, "make": "Honda", "mileage": 73000, "minPrice": 10000.0, "model": "Accord", "trim": "EX", "type": "Sedan", "vehicleID": 3, "vin": "1N6ED26Y84C422344", "year": 2011, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, "currentPrice": 12000.0, "desc": "2011 Honda Accord EX", "status": "Unsold", "winner": null }, { "auctionID": 11, "bids": [ { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" }, { "accountID": 4, "amount": 20000.0, "bidTime": "2017-03-14T22:08:54Z", "buyerID": 4, "id": 9, "lotID": 4, "status": "Outbid" } ], "color": "Brown", "detailLink": "https://carmaxauctionit.wordpress.com/2013-honda-pilot-lx/", "id": 4, "make": "Honda", "mileage": 42000, "minPrice": 20000.0, "model": "Pilot", "trim": "LX", "type": "Crossover", "vehicleID": 4, "vin": "JT8UF11E2N0138449", "year": 2013, "bidsCount": 2, "bidsMax": { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" }, "currentPrice": 21000.0, "desc": "2013 Honda Pilot LX", "status": "Sold", "winner": { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" } }, { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 20000.0, "bidTime": "2017-03-14T22:11:33Z", "buyerID": 3, "id": 13, "lotID": 5, "status": "Placed" }, { "accountID": 7, "amount": 19000.0, "bidTime": "2017-03-14T22:11:05Z", "buyerID": 6, "id": 12, "lotID": 5, "status": "Outbid" }, { "accountID": 10, "amount": 18000.0, "bidTime": "2017-03-14T22:09:48Z", "buyerID": 10, "id": 11, "lotID": 5, "status": "Outbid" } ], "color": "Gray", "detailLink": "https://carmaxauctionit.wordpress.com/2014-hyundai-genesis-premiun/", "id": 5, "make": "Hyundai", "mileage": 19000, "minPrice": 18000.0, "model": "Genesis", "trim": "Premium", "type": "Coupe", "vehicleID": 5, "vin": "1GT120E8XFF595149", "year": 2014, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 20000.0, "bidTime": "2017-03-14T22:11:33Z", "buyerID": 3, "id": 13, "lotID": 5, "status": "Placed" }, "currentPrice": 20000.0, "desc": "2014 Hyundai Genesis Premium", "status": "Unsold", "winner": null }, { "auctionID": 11, "bids": [ { "accountID": 4, "amount": 10000.0, "bidTime": "2017-03-14T22:11:13Z", "buyerID": 4, "id": 15, "lotID": 6, "status": "Placed" }, { "accountID": 7, "amount": 9000.0, "bidTime": "2017-03-14T22:10:01Z", "buyerID": 8, "id": 14, "lotID": 6, "status": "Outbid" } ], "color": "Green", "detailLink": "https://carmaxauctionit.wordpress.com/2009-toyota-camry-xle/", "id": 6, "make": "Toyota", "mileage": 118000, "minPrice": 9000.0, "model": "Camry", "trim": "XLE", "type": "Sedan", "vehicleID": 6, "vin": "1GYS4EEJ5CR391166", "year": 2009, "bidsCount": 2, "bidsMax": { "accountID": 4, "amount": 10000.0, "bidTime": "2017-03-14T22:11:13Z", "buyerID": 4, "id": 15, "lotID": 6, "status": "Placed" }, "currentPrice": 10000.0, "desc": "2009 Toyota Camry XLE", "status": "Unsold", "winner": null } ], "participants": 7, "postalCode": "30144", "startTime": "2017-03-01T13:00:00Z", "stateCode": "GA", "state": "Georgia" }';
	
	// Sample JSON for Get Auction 10
	const mockFutureAuction = '{ "address": "7062 Kingston St", "city": "Georgetown", "endTime": "2017-08-14T21:00:00Z", "id": 10, "lots": [], "participants": 0, "postalCode": "29440", "startTime": "2017-08-14T19:00:00Z", "stateCode": "SC", "state": "South Carolina" }';
	
	// Sample JSON for Get Auction 4
	const mockPastAuction = '{ "address": "8950 Birchwood St", "city": "Forney", "endTime": "2016-09-15T19:00:00Z", "id": 4, "lots": [], "participants": 0, "postalCode": "75126", "startTime": "2016-09-15T17:00:00Z", "stateCode": "TX", "state": "Texas" }';
	
});