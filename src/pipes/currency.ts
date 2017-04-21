/*
	Currency Pipe
	=============
	Quickly formats number values as currency string.
*/

import {Pipe} from '@angular/core';
 
@Pipe({
  	name: 'currency'
})
export class CurrencyPipe {
	transform(value: number) {
		if (value != null) {
			// 25000 becomes "$ 25,000"
			return "$ " + value.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join(",");
		}
	}
}