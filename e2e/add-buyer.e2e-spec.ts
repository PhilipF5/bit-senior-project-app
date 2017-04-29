import { browser, element, by, ElementFinder } from "protractor";
 
describe("Create New Buyer", () => {
 
	beforeEach(() => {
		
	});

	it("should display the login modal", () => {
		browser.get("");
		expect(element(by.css("page-login")).isPresent()).toBeTruthy();
	});
	
	it("should login successfully", () => {
		element(by.css(".username input")).sendKeys("davidg");
		element(by.css(".password input")).sendKeys("admin");
		element(by.css(".login")).click().then(() => {
			browser.driver.sleep(20000);
			expect(element(by.css("page-login")).isPresent()).toBeFalsy();
		});
	});
	
	it("should navigate to Account List Page", () => {
		//browser.explore();
		element(by.css("ion-navbar button.menu")).click().then(() => {
			browser.driver.sleep(1000);
			element(by.css("button.accounts")).click().then(() => {
				browser.driver.sleep(1000);
				expect(element(by.css("ion-navbar ion-title")).getAttribute("innerHTML")).toContain("Dealer Accounts");
			});
		});
	});
	
	it("should successfully submit new buyer info", () => {
		element(by.css(".addbuyer")).click().then(() => {
			browser.driver.sleep(1000);
			element(by.css(".firstname input")).sendKeys("Bill");
			element(by.css(".lastname input")).sendKeys("Nye");
			element(by.css(".username input")).sendKeys("scienceguy");
			element(by.css(".submit")).click().then(() => {
				browser.driver.sleep(10000);
				expect(element(by.css(".alert-title")).getAttribute("innerHTML")).toContain("User scienceguy created");
			});
		});
	});
	
});