import {Pipe} from '@angular/core';
 
@Pipe({
  	name: 'currency'
})

export class CurrencyPipe {
	transform(value: number) {
		if (value != null) {
			return "$ " + value.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join(",");
		}
	}
}