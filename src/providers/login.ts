import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {
	
	public creds: Credentials = new Credentials();

	constructor(public http: Http) {

	}
	
	public login(username: string, password: string) {
		return new Promise((resolve, reject) => {
			console.log("Logging in with username " + username + " ...");
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

export class Credentials {
	
	public apiKey: string;
	public error: string;
	public firstName: string;
	public lastName: string;
	public role: string;
	public username: string;
	
}
