import { browser, element, by, ElementFinder } from "protractor";
 
describe("Accept Bid", () => {
 
	beforeEach(() => {
		
	});

	it("should display the login modal", () => {
		browser.get("");
		expect(element(by.css("page-login")).isPresent()).toBeTruthy();
	});
	
	it("should log in as admin", () => {
		element(by.css(".username input")).sendKeys("davidg");
		element(by.css(".password input")).sendKeys("admin");
		element(by.css(".login")).click().then(() => {
			browser.driver.sleep(20000);
			expect(element(by.css("page-login")).isPresent()).toBeFalsy();
		});
	});
	
	it("should navigate to Auction #11", () => {
		element(by.css(".currentauctions button")).click().then(() => {
			browser.driver.sleep(10000);
			expect(element(by.css(".auctionID")).getAttribute("innerHTML")).toContain("Auction #11");
		});
	});
	
	it("should navigate to Lot #3", () => {
		element(by.css(".lotlist ion-item-sliding:nth-child(3) button.item")).click().then(() => {
			browser.driver.sleep(10000);
			expect(element(by.css(".lotID")).getAttribute("innerHTML")).toContain("Lot #3");
		});
	});
	
	it("should successfully accept bid", () => {
		element(by.css(".acceptbid")).click().then(() => {
			browser.driver.sleep(5000);
			expect(element(by.css(".alert-title")).getAttribute("innerHTML")).toContain("Bid accepted");
		});
	});
	
	it("should refresh with lot closed", () => {
		element(by.css(".alert-button")).click().then(() => {
			browser.driver.sleep(18000);
			expect(element(by.css("h1.status")).getAttribute("innerHTML")).toContain("SOLD");
		});
	});
	
});