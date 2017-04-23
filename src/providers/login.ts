/*
	Login Provider Service
	======================
	Handles the login API call and stores validated credentials,
	including the API key, for use throughout the app.
*/

// Standard service stuff
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// Import needed libraries
import * as models from '../app/classes';

@Injectable()
export class LoginProvider {
	
	// Credentials info retrieved from API call
	public creds: models.Credentials = new models.Credentials();

	constructor(public http: Http) {

	}
	
	// Create Promise to check login info against the API
	public login(username: string, password: string) {
		return new Promise((resolve, reject) => {
			console.log("Logging in with username " + username + " ...");
			// Use HTTPS POST to send credentials to the server
			let headers = new Headers();
			headers.append("Content-Type", "application/json");
			this.http.post("https://auctionitapi.azurewebsites.net/api/login", JSON.stringify(username + ' ' + password), {headers: headers})
			.subscribe(
				res => this.creds = res.json(),
				(err) => {},
				() => {
					resolve();
				}
			);
		});
	}
	
}
