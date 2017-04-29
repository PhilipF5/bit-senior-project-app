/*
	Profile Provider Tests
*/

// Standard test stuff
import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Import the service to test
import { ProfileProvider } from "./profile";

describe("Profile Provider Service", () => {

	// Set up mock HTTP service
	beforeEach(() => {
		TestBed.configureTestingModule({
            declarations: [],
            providers: [
                ProfileProvider,
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
	
	// Test loadAllProfiles()
	it("should load all profiles from accounts array", inject([ProfileProvider, MockBackend], (profileProvider, mockBackend) => {
		// Run function to test
        profileProvider.loadAllProfiles(mockAllAccounts);
		// profiles property should be an array
		expect(Array.isArray(profileProvider.profiles)).toBeTruthy();
		// Array should not be empty
		expect(profileProvider.profiles.length).toBeGreaterThan(0);
	}));
	
	it("should create a duplicate array sorted by descending total spent", inject([ProfileProvider, MockBackend], (profileProvider, mockBackend) => {
		// Run function to test
        profileProvider.loadAllProfiles(mockAllAccounts);
		// Check if sortBySpent is in the right order
		let correctOrder = true;
        for (let i = 0; i < profileProvider.sortBySpent.length - 1; i++) {
			if (profileProvider.sortBySpent[i].totalSpent < profileProvider.sortBySpent[i + 1].totalSpent) {
				correctOrder = false;
			}
		}
		// sortBySpent property should now hold an array
		expect(Array.isArray(profileProvider.sortBySpent)).toBeTruthy();
		// Array should be in the correct order
		expect(correctOrder).toBeTruthy();
	}));
	
	// Test loadMyProfile()
	it("should load a single profile object", inject([ProfileProvider, MockBackend], (profileProvider, mockBackend) => {
		// Put mock data in place
		mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockMyProfile
            })));
        });
		// Run function to test
		profileProvider.loadMyProfile("apiKey");
		// account property should now be an object
		expect(profileProvider.profile).toBeTruthy();
	});
	
	// SAMPLE JSON -------------------------------------
	
	// Sample JSON array for all accounts and buyers
	const mockAllAccounts = [ { "address": "7036 Crescent Street", "buyers": [ { "accountID": 1, "auctions": [ 11 ], "bids": [ { "accountID": 1, "amount": 16000.0, "bidTime": "2017-03-14T22:06:24Z", "buyerID": 1, "id": 1, "lotID": 1, "status": "Outbid" }, { "accountID": 1, "amount": 21000.0, "bidTime": "2017-03-14T22:10:55Z", "buyerID": 1, "id": 10, "lotID": 4, "status": "Winner" } ], "bidsMax": 21000.0, "bidsMin": 16000.0, "id": 1, "firstName": "Joel", "lastName": "Helberg", "totalSpent": 21000.0, "username": "user", "auctionCount": 1, "bidsCount": 2, "fullName": "Joel Helberg" } ], "city": "West Lafayette", "contactEmail": "wholesale@shelor.com", "contactPhone": "540-555-1234", "id": 1, "owner": "Shelor Motor Mile", "postalCode": "54637", "stateCode": "IN", "totalCredit": 175000.0, "totalSpent": 21000.0, "usedCredit": 0.0, "availableCredit": 175000.0, "state": "Indiana" }, { "address": "3 Lake View Lane", "buyers": [], "city": "Richmond", "contactEmail": "duncan@hokiehonda.com", "contactPhone": "540-555-5678", "id": 2, "owner": "Duncan\'s Hokie Honda", "postalCode": "24060", "stateCode": "VA", "totalCredit": 225000.0, "totalSpent": 0.0, "usedCredit": 0.0, "availableCredit": 225000.0, "state": "Virginia" }, { "address": "4 Hamilton Ave", "buyers": [ { "accountID": 3, "auctions": [ 11, 3, 6 ], "bids": [ { "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }, { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" } ], "bidsMax": 17000.0, "bidsMin": 12000.0, "id": 2, "firstName": "Kristy", "lastName": "Cooper", "totalSpent": 0.0, "username": "user", "auctionCount": 3, "bidsCount": 2, "fullName": "Kristy Cooper" }, { "accountID": 3, "auctions": [ 11 ], "bids": [ { "accountID": 3, "amount": 21000.0, "bidTime": "2017-03-14T22:06:43Z", "buyerID": 3, "id": 4, "lotID": 2, "status": "Outbid" }, { "accountID": 3, "amount": 20000.0, "bidTime": "2017-03-14T22:11:33Z", "buyerID": 3, "id": 13, "lotID": 5, "status": "Placed" } ], "bidsMax": 21000.0, "bidsMin": 20000.0, "id": 3, "firstName": "Emily", "lastName": "Breslin", "totalSpent": 0.0, "username": "user", "auctionCount": 1, "bidsCount": 2, "fullName": "Emily Breslin" } ], "city": "Charlotte", "contactEmail": "sales@robertson.com", "contactPhone": "302-555-5843", "id": 3, "owner": "Robertson Auto Sales", "postalCode": "49383", "stateCode": "NC", "totalCredit": 145000.0, "totalSpent": 0.0, "usedCredit": 32000.0, "availableCredit": 113000.0, "state": "North Carolina" }, { "address": "621 High Noon Court", "buyers": [ { "accountID": 4, "auctions": [ 11 ], "bids": [ { "accountID": 4, "amount": 18000.0, "bidTime": "2017-03-14T22:10:26Z", "buyerID": 4, "id": 3, "lotID": 1, "status": "Winner" }, { "accountID": 4, "amount": 20000.0, "bidTime": "2017-03-14T22:08:54Z", "buyerID": 4, "id": 9, "lotID": 4, "status": "Outbid" }, { "accountID": 4, "amount": 10000.0, "bidTime": "2017-03-14T22:11:13Z", "buyerID": 4, "id": 15, "lotID": 6, "status": "Placed" } ], "bidsMax": 20000.0, "bidsMin": 10000.0, "id": 4, "firstName": "Ethan", "lastName": "Scarborough", "totalSpent": 18000.0, "username": "user", "auctionCount": 1, "bidsCount": 3, "fullName": "Ethan Scarborough" }, { "accountID": 4, "auctions": [], "bids": [], "bidsMax": 0.0, "bidsMin": 100000.0, "id": 5, "firstName": "Stuart", "lastName": "Devine", "totalSpent": 0.0, "username": "user", "auctionCount": 0, "bidsCount": 0, "fullName": "Stuart Devine" } ], "city": "Clemson", "contactEmail": "dealer@pinkerton.com", "contactPhone": "732-555-9538", "id": 4, "owner": "Pinkerton Chevrolet", "postalCode": "92858", "stateCode": "SC", "totalCredit": 200000.0, "totalSpent": 18000.0, "usedCredit": 10000.0, "availableCredit": 190000.0, "state": "South Carolina" } ];
	
	// Sample JSON for Get My Profile
	const mockMyProfile = '{ "accountID": 3, "auctions": [ 11, 3, 6 ], "bids": [ { "accountID": 3, "amount": 17000.0, "bidTime": "2017-03-14T22:10:14Z", "buyerID": 2, "id": 2, "lotID": 1, "status": "Outbid" }, { "accountID": 3, "amount": 12000.0, "bidTime": "2017-03-14T22:10:43Z", "buyerID": 2, "id": 8, "lotID": 3, "status": "Placed" }, { "accountID": 3, "amount": 23000.0, "bidTime": "2017-04-24T01:42:21Z", "buyerID": 2, "id": 16, "lotID": 2, "status": "Placed" } ], "bidsMax": 23000.0, "bidsMin": 12000.0, "id": 2, "firstName": "Kristy", "lastName": "Cooper", "totalSpent": 0.0, "username": "kristyc", "auctionCount": 3, "bidsCount": 3, "fullName": "Kristy Cooper" }';
	
});