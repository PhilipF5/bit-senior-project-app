/*
	Lot Provider Tests
*/

// Standard test stuff
import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Import the service to test
import { LotProvider } from "./lot";

describe("Lot Provider Service", () => {

	// Set up mock HTTP service
	beforeEach(() => {
		TestBed.configureTestingModule({
            declarations: [],
            providers: [
                LotProvider,
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
	
	// Test bidOnLot()
	it("should handle bid returned with Bounced status", inject([LotProvider, MockBackend], (lotProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockBouncedBid
            })));
        });
		// Run function to test
		let result: any;
		lotProvider.bidOnLot(15000, "apiKey").then((res) => {
			result = res;
			// Result title should say bid was rejected
			expect(result.title).toBe("Bid Rejected");
		});
	}));
	
	it("should handle bid returned with Duplicate status", inject([LotProvider, MockBackend], (lotProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockDuplicateBid
            })));
        });
		// Run function to test
		let result: any;
		lotProvider.bidOnLot(15000, "apiKey").then((res) => {
			result = res;
			// Result title should say bid was rejected
			expect(result.title).toBe("Bid Rejected");
		});
	}));
	
	it("should handle bid returned with Late status", inject([LotProvider, MockBackend], (lotProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockLateBid
            })));
        });
		// Run function to test
		let result: any;
		lotProvider.bidOnLot(15000, "apiKey").then((res) => {
			result = res;
			// Result title should say bid was rejected
			expect(result.title).toBe("Bid Rejected");
		});
	}));
	
	it("should handle bid returned with Low status", inject([LotProvider, MockBackend], (lotProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockLowBid
            })));
        });
		// Run function to test
		let result: any;
		lotProvider.bidOnLot(15000, "apiKey").then((res) => {
			result = res;
			// Result title should say bid was rejected
			expect(result.title).toBe("Bid Rejected");
		});
	}));
	
	it("should handle bid returned with Placed status", inject([LotProvider, MockBackend], (lotProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockPlacedBid
            })));
        });
		// Run function to test
		let result: any;
		lotProvider.bidOnLot(15000, "apiKey").then((res) => {
			result = res;
			// Result title should say bid was rejected
			expect(result.title).toBe("Bid Placed");
		});
	}));
	
	it("should handle bid returned with Unauthorized status", inject([LotProvider, MockBackend], (lotProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockUnauthorizedBid
            })));
        });
		// Run function to test
		lotProvider.bidOnLot(15000, "apiKey").then((result) => {
			// Result title should say bid was rejected
			expect(result.title).toBe("Bid Rejected");
		});
	}));
	
	// Test hasWon()
	it("should know if our account won a lot", inject([LotProvider, MockBackend], (lotProvider, mockBackend) => {
		// Put mock data in place
        lotProvider.activeLot = mockLotWon;
		// Run function to test
		expect(lotProvider.hasWon(4)).toBeTruthy();
	}));
	
	// Text isWinning()
	it("should know if our account is winning a lot", inject([LotProvider, MockBackend], (lotProvider, mockBackend) => {
		// Put mock data in place
        lotProvider.activeLot = mockOpenLotWinning;
		// Run function to test
		expect(lotProvider.isWinning(3)).toBeTruthy();
	}));
	
	// SAMPLE JSON -------------------------------------
	
	// Sample JSON for bid statuses
	const mockBouncedBid = '{ "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Bounced" }';
	const mockDuplicateBid = '{ "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Duplicate" }';
	const mockLateBid = '{ "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Late" }';
	const mockLowBid = '{ "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Low" }';
	const mockOutbidBid = '{ "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }';
	const mockPlacedBid = '{ "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Placed" }';
	const mockUnauthorizedBid = '{ "accountID": null, "amount": null, "bidTime": null, "buyerID": null, "id": null, "lotID": null, "status": "Unauthorized" }';

	// Sample JSON object for lot we have won
	const mockLotWon = { "auctionID": 11, "bids": [ { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" }, { "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }, { "accountID": 1, "amount": 16000.0, "bidTime": "2017-03-14T22:06:24Z", "buyerID": 1, "id": 1, "lotID": 1, "status": "Outbid" } ], "color": "White", "detailLink": "https://carmaxauctionit.wordpress.com/home/carmax-auction/", "id": 1, "make": "Audi", "mileage": 53000, "minPrice": 16000.0, "model": "A4", "trim": "Premium", "type": "Sedan", "vehicleID": 1, "vin": "19UUA566X1A062669", "year": 2012, "bidsCount": 3, "bidsMax": { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" }, "currentPrice": 18000.0, "desc": "2012 Audi A4 Premium", "status": "Sold", "winner": { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" } };
	
	// Sample JSON object for open lot we are winning
	const mockOpenLotWinning = { "auctionID": 11, "bids": [ { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" }, { "accountID": 7, "amount": 22000.0, "bidTime": "2017-03-14T22:10:32Z", "buyerID": 6, "id": 5, "lotID": 2, "status": "Outbid" }, { "accountID": 3, "amount": 21000.0, "bidTime": "2017-03-14T22:06:43Z", "buyerID": 3, "id": 4, "lotID": 2, "status": "Outbid" } ], "color": "Silver", "detailLink": "https://carmaxauctionit.wordpress.com/2011-bmw-335/", "id": 2, "make": "BMW", "mileage": 63000, "minPrice": 21000.0, "model": "335", "trim": "", "type": "Coupe", "vehicleID": 2, "vin": "1GBHK34FXRE222238", "year": 2011, "bidsCount": 3, "bidsMax": { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" }, "currentPrice": 23000.0, "desc": "2011 BMW 335 ", "status": "Unsold", "winner": null };
	
});