import { browser, element, by, ElementFinder } from "protractor";
 
describe("Place New Bid", () => {
 
	beforeEach(() => {
		
	});

	it("should display the login modal", () => {
		browser.get("");
		expect(element(by.css("page-login")).isPresent()).toBeTruthy();
	});
	
	it("should login successfully", () => {
		element(by.css(".username input")).sendKeys("coopek");
		element(by.css(".password input")).sendKeys("dbd4");
		element(by.css(".login")).click().then(() => {
			browser.driver.sleep(20000);
			expect(element(by.css("page-login")).isPresent()).toBeFalsy();
		});
	});
	
	it("should navigate to Current Auction (#11)", () => {
		element(by.css(".currentauction")).click().then(() => {
			browser.driver.sleep(10000);
			expect(element(by.css(".auctionID")).getAttribute("innerHTML")).toContain("Auction #11");
		});
	});
	
	it("should navigate to Lot #2", () => {
		element(by.css(".lotlist ion-item-sliding:nth-child(2) button.item")).click().then(() => {
			browser.driver.sleep(10000);
			expect(element(by.css(".lotID")).getAttribute("innerHTML")).toContain("Lot #2");
		});
	});
	
	it("should successfully place Quick Bid", () => {
		element(by.css(".quickbid")).click().then(() => {
			browser.driver.sleep(1000);
			element(by.css(".alert-button:nth-child(2)")).click().then(() => {
				browser.driver.sleep(5000);
				expect(element(by.css(".alert-title")).getAttribute("innerHTML")).toContain("Bid Placed");
			});
		});
	});
	
	it("should refresh with new bid in history", () => {
		element(by.css(".alert-button")).click().then(() => {
			browser.driver.sleep(15000);
			expect(element(by.css(".maxbid")).getAttribute("innerHTML")).toContain("$ 23,000");
		});
	});
	
});