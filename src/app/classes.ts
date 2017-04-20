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

export class Auction {

	public address: string;
	public buyers: Profile[];
	public city: string;
	public endTime: string;
	public id: number;
	public lots: Lot[];
	public participants: number[];
	public postalCode: string;
	public startTime: string;
	public state: string;
	public stateCode: string;

}

export class Bid {
	public accountID: number;
	public amount: number;
	public bidTime: string;
	public buyerID: number;
	public id: number;
	public lotID: number;
	public status: string;
}

export class Credentials {
	
	public apiKey: string;
	public error: string;
	public firstName: string;
	public lastName: string;
	public role: string;
	public username: string;
	
}

export class Lot {

	public auctionID: number;
	public bids: Bid[];
	public bidsCount: number;
	public bidsMax: Bid;
	public color: string;
	public currentPrice: number;
	public desc: string;
	public detailLink: string;
	public id: number;
	public make: string;
	public mileage: number;
	public minPrice: number;
	public model: string;
	public status: string;
	public trim: string;
	public vehicleID: number;
	public vin: string;
	public winner: Bid
	public year: number;
	
}

export class Profile {
	
	public accountID: number;
	public auctionCount: number;
	public auctions: number[];
	public bids: Bid[];
	public bidsCount: number;
	public bidsMax: Bid;
	public bidsMin: Bid;
	public firstName: string;
	public fullName: string;
	public id: number;
	public lastName: string;
	public totalSpent: number;
	public username: string;
	public wins?: number;
	
}
