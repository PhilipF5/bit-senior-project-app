import { browser, element, by, ElementFinder } from "protractor";
 
describe("Create New Dealer", () => {
 
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
	
	it("should navigate to Account List Page", () => {
		element(by.css("ion-navbar button.menu")).click().then(() => {
			browser.driver.sleep(1000);
			element(by.css("button.accounts")).click().then(() => {
				browser.driver.sleep(1000);
				expect(element(by.css("ion-navbar ion-title")).getAttribute("innerHTML")).toContain("Dealer Accounts");
			});
		});
	});
	
	it("should successfully submit new dealer info", () => {
		element(by.css(".addaccount")).click().then(() => {
			browser.driver.sleep(1000);
			element(by.css(".dealername input")).sendKeys("Billy Craft Honda");
			element(by.css(".email input")).sendKeys("billy@crafthonda.com");
			element(by.css(".phone input")).sendKeys("555-123-4545");
			element(by.css(".credit input")).sendKeys("140000");
			element(by.css(".address input")).sendKeys("123 Burning Tree Way");
			element(by.css(".city input")).sendKeys("Alpharetta");
			element(by.css(".state input")).sendKeys("GA");
			element(by.css(".postal input")).sendKeys("45545");
			element(by.css(".submit")).click().then(() => {
				browser.driver.sleep(10000);
				expect(element(by.css(".alert-title")).getAttribute("innerHTML")).toContain("Dealer created");
			})
		});
	});
	
});