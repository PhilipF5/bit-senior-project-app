// Structure of account objects from API
export class Account {

	public address: string;
	public availableCredit: number;
	public buyers: any;
	public city: string;
	public contactEmail: string;
	public contactPhone: string;
	public id: number;
	public owner: string;
	public postalCode: string;
	public state: string;
	public stateCode: string;
	public totalCredit: number;
	public totalSpent: number;
	public usedCredit: number;
	
}

// Structure of login objects from API
export class Credentials {
	
	public apiKey: string;
	public error: string;
	public firstName: string;
	public lastName: string;
	public role: string;
	public username: string;
	
}

// Structure of buyer objects from API
export class Profile {
	
	public accountID: number,
	public auctionCount: number,
	public auctions: number[],
	public bids: Bid[],
	public bidsCount: number,
	public bidsMax: Bid,
	public bidsMin: Bid,
	public firstName: string,
	public fullName: string,
	public id: number,
	public lastName: string,
	public totalSpent: number,
	public username: string
	
}