/*
	Login Provider Tests
*/

// Standard test stuff
import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Import the service to test
import { LoginProvider } from "./login";

describe("Login Provider Service", () => {

	// Set up mock HTTP service
	beforeEach(() => {
		TestBed.configureTestingModule({
            declarations: [],
            providers: [
                LoginProvider,
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
	
	it("should load a credentials object with an API key", inject([LoginProvider, MockBackend], (loginProvider, mockBackend) => {
		// Put mock data in place
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockCredentials
            })));
        });
		// Run function to test
		loginProvider.login("kristyc", "password");
		// creds property should hold a credentials object
		expect(loginProvider.creds).toBeTruthy();
		// creds object should hold an API key
		expect(loginProvider.creds.apiKey).toBeTruthy();
	}));
	
	// SAMPLE JSON -------------------------------------
	
	// Sample JSON for Login
	const mockCredentials = '{ "apiKey": "8f830g8e8fv8eb", "error": null, "firstName": "Kristy", "lastName": "Cooper", "role": "user", "username": "kristyc" }';
	
});