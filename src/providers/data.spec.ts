/*
	Data Provider Tests
*/

// Standard test stuff
import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Import the service to test
import { DataProvider } from "./data";

// Import underlying services
import { AccountProvider } from "./account";
import { AuctionProvider } from "./auction";
import { LoginProvider } from "./login";
import { LotProvider } from "./lot";
import { ProfileProvider } from "./profile";

// Import mocks
import { AccountMock, AuctionMock, LoginMock, LotMock, ProfileMock } from "../mocks";

describe("Data Provider Service", () => {
	
	// Set up mock HTTP service
	beforeEach(() => {
		TestBed.configureTestingModule({
            declarations: [],
            providers: [
                DataProvider,
				{
					provide: AccountProvider,
					useClass: AccountMock
				},
				{
					provide: AuctionProvider,
					useClass: AuctionMock
				},
				{
					provide: LoginProvider,
					useClass: LoginMock
				},
				{
					provide: LotProvider,
					useClass: LotMock
				},
				{
					provide: ProfileProvider,
					useClass: ProfileMock
				},
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
	
	it("should get accounts from AccountProvider", inject([DataProvider, AccountProvider, MockBackend], (dataSrv, acctProvider, mockBackend) => {
		// should be equivalent to underlying object
		expect(dataSrv.accounts).toBe(acctProvider.accounts);
	}));
	
	it("should get sortBySpent from AccountProvider", inject([DataProvider, AccountProvider, MockBackend], (dataSrv, acctProvider, mockBackend) => {
		// should be equivalent to underlying object
		expect(dataSrv.accountsBySpent).toBe(acctProvider.sortBySpent);
	}));
	
	it("should get myAccount from AccountProvider", inject([DataProvider, AccountProvider, MockBackend], (dataSrv, acctProvider, mockBackend) => {
		// should be equivalent to underlying object
		expect(dataSrv.activeAccount).toBe(acctProvider.myAccount);
	}));
	
	it("should set selectedAcct and selectedAcctID in AccountProvider", inject([DataProvider, AccountProvider, MockBackend], (dataSrv, acctProvider, mockBackend) => {
		// Run code to test
		dataSrv.activeAccount = 2;
		// Check results in acctProvider
		expect(acctProvider.selectedAcct).toBe(2);
		expect(acctProvider.selectedAcctID).toBe(3);
	}));
	
	it("should get auction from AuctionProvider", inject([DataProvider, AuctionProvider, MockBackend], (dataSrv, auctionProvider, mockBackend) => {
		// Should be equivalent to the underlying object
		expect(dataSrv.activeAuction).toBe(auctionProvider.auction);
	}));
	
	it("should get activeLot from LotProvider", inject([DataProvider, LotProvider, MockBackend], (dataSrv, lotProvider, mockBackend) => {
		// Should be equivalent to the underlying object
		expect(dataSrv.activeLot).toBe(lotProvider.activeLot);
	}));
	
	it("should set activeLot in LotProvider", inject([DataProvider, LotProvider, MockBackend], (dataSrv, lotProvider, mockBackend) => {
		// Run code to test
		dataSrv.activeLot = 3;
		// Check results in acctProvider
		expect(lotProvider.activeLot.id).toBe(3);
	}));
	
	it("should get activeProfile from ProfileProvider", inject([DataProvider, ProfileProvider, MockBackend], (dataSrv, profileProvider, mockBackend) => {
		// Should be equivalent to the underlying object
		expect(dataSrv.activeProfile).toBe(profileProvider.profile);
	}));
	
	it("should get apiKey from LoginProvider", inject([DataProvider, LoginProvider, MockBackend], (dataSrv, loginProvider, mockBackend) => {
		// Should be equivalent to the underlying object
		expect(dataSrv.apiKey).toBe(loginProvider.creds.apiKey);
	}));
	
	it("should get auctions from AuctionProvider", inject([DataProvider, AuctionProvider, MockBackend], (dataSrv, auctionProvider, mockBackend) => {
		// Should be equivalent to the underlying object
		expect(dataSrv.auctions).toBe(auctionProvider.auctions);
	}));
	
	it("should get creds from LoginProvider", inject([DataProvider, LoginProvider, MockBackend], (dataSrv, loginProvider, mockBackend) => {
		// Should be equivalent to the underlying object
		expect(dataSrv.creds).toBe(loginProvider.creds);
	}));
	
	it("should get currentAuction from AuctionProvider", inject([DataProvider, AuctionProvider, MockBackend], (dataSrv, auctionProvider, mockBackend) => {
		// Should be equivalent to the underlying object
		expect(dataSrv.currentAuction).toBe(auctionProvider.currentAuction);
	}));
	
	it("should get myAccount from AccountProvider", inject([DataProvider, AccountProvider, MockBackend], (dataSrv, acctProvider, mockBackend) => {
		// Should be equivalent to the underlying object
		expect(dataSrv.myAccount).toBe(acctProvider.myAccount);
	}));
	
	it("should get sortBySpent from ProfileProvider", inject([DataProvider, ProfileProvider, MockBackend], (dataSrv, profileProvider, mockBackend) => {
		// Should be equivalent to the underlying object
		expect(dataSrv.profilesBySpent).toBe(profileProvider.sortBySpent);
	}));
	
	it("should get role from LoginProvider", inject([DataProvider, LoginProvider, MockBackend], (dataSrv, loginProvider, mockBackend) => {
		// Should be equivalent to the underlying object
		expect(dataSrv.role).toBe(loginProvider.creds.role);
	}));
	
	it("should get selectedAcctID and selectedAcctIndex from AccountProvider", inject([DataProvider, AccountProvider, MockBackend], (dataSrv, acctProvider, mockBackend) => {
		// Should be equivalent to the underlying objects
		expect(dataSrv.selectedAcctID).toBe(acctProvider.selectedAcctID);
		expect(dataSrv.selectedAcctIndex).toBe(acctProvider.selectedAcct);
	}));
	
	it("should acceptBid via LotProvider", inject([DataProvider, MockBackend], (dataSrv, mockBackend) => {
		// Promise should resolve
		dataSrv.acceptBid().then(
			() => expect(true).toBeTruthy,
			(err) => expect(false).toBeTruthy
		);
	}));
	
	it("should know if activeLot is open", inject([DataProvider, MockBackend], (dataSrv, mockBackend) => {
		// Boolean should be true
		expect(dataSrv.activeLotIsOpen()).toBeTruthy();
	}));
	
	it("should know if activeLot is sold", inject([DataProvider, MockBackend], (dataSrv, mockBackend) => {
		// Boolean should be false
		expect(dataSrv.activeLotIsSold()).toBeFalsy();
	}));
	
	it("should know the timing of auction", inject([DataProvider, MockBackend], (dataSrv, mockBackend) => {
		// Returned string should be "current"
		expect(dataSrv.auctionTiming()).toBe("current");
	}));
	
	it("should createAccount via AccountProvider", inject([DataProvider, MockBackend], (dataSrv, mockBackend) => {
		// Promise should be resolved with myAccount object
		dataSrv.createAccount(null).then(
			(newAccount) => {
				expect(newAccount).toBe(dataSrv.activeAccount);
			},
			(error) => {
				expect(false).toBeTruthy();
			}
		);
	}));
	
	it("should createProfile via ProfileProvider", inject([DataProvider, MockBackend], (dataSrv, mockBackend) => {
		// Promise should be resolved with profile object
		dataSrv.createProfile(null).then(
			(newUser) => {
				expect(newUser).toBe(dataSrv.activeProfile);
			},
			(error) => {
				expect(false).toBeTruthy();
			}
		);
	}));
	
	it("should ask LotProvider if we have won activeLot", inject([DataProvider, LotProvider, MockBackend], (dataSrv, lotProvider, mockBackend) => {
		// Should be equivalent to the underlying method
		expect(dataSrv.hasWonActiveLot()).toBe(lotProvider.hasWon(1));
	}));
	
	it("should ask AuctionProvider if we are registered", inject([DataProvider, AuctionProvider, MockBackend], (dataSrv, auctionProvider, mockBackend) => {
		// Should be equivalent to the underlying object
		expect(dataSrv.isRegForAuction()).toBe(auctionProvider.isRegistered(null, []));
	}));
	
	it("should ask LotProvider if we are winning activeLot", inject([DataProvider, LotProvider, MockBackend], (dataSrv, lotProvider, mockBackend) => {
		// Should be equivalent to the underlying method
		expect(dataSrv.isWinningActiveLot()).toBe(lotProvider.isWinning(1));
	}));
	
	it("should load auction via AuctionProvider", inject([DataProvider, MockBackend], (dataSrv, mockBackend) => {
		// Promise should resolve
		dataSrv.loadAuction(0).then(
			() => expect(true).toBeTruthy,
			(err) => expect(false).toBeTruthy
		);
	}));
	
	it("should load charts data", inject([DataProvider, MockBackend], (dataSrv, mockBackend) => {
		// Put data in place
		mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: {test: "test"}
            })));
        });
		// All Promises should resolve
		dataSrv.loadChartsDataModels().then(
			() => expect(true).toBeTruthy,
			(err) => expect(false).toBeTruthy
		);
		dataSrv.loadChartsDataStates().then(
			() => expect(true).toBeTruthy,
			(err) => expect(false).toBeTruthy
		);
		dataSrv.loadChartsDataTypes().then(
			() => expect(true).toBeTruthy,
			(err) => expect(false).toBeTruthy
		);
	}));
	
	it("should load data via providers", inject([DataProvider, MockBackend], (dataSrv, mockBackend) => {
		// Promise should resolve
		dataSrv.loadData().then(
			() => expect(true).toBeTruthy,
			(err) => expect(false).toBeTruthy
		);
	}));
	
	it("should log in via LoginProvider", inject([DataProvider, MockBackend], (dataSrv, mockBackend) => {
		// Promise should resolve
		dataSrv.login("username", "password").then(
			() => expect(true).toBeTruthy,
			(err) => expect(false).toBeTruthy
		);
	}));
	
	it("should log out and clear data", inject([DataProvider, MockBackend], (dataSrv, mockBackend) => {
		// Run code to test
		dataSrv.logout();
		// Key properties should be null
		expect(dataSrv.apiKey).toBeFalsy();
		expect(dataSrv.currentAuction.id).toBeFalsy();
		expect(dataSrv.activeProfile.id).toBeFalsy();
	}));
	
	it("should place a bid via LotProvider", inject([DataProvider, MockBackend], (dataSrv, mockBackend) => {
		// Promise should resolve as bid placed
		dataSrv.placeBid(15000).then(
			(result) => {
				expect(result.title).toBe("Bid Placed");
			},
			(error) => {
				expect(false).toBeTruthy();
			}
		);
	}))
	
});