import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoginProvider } from '../providers/login';
import { AccountProvider } from '../providers/account';
import { CurrencyPipe } from '../pipes/currency';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		LoginPage,
		CurrencyPipe
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		LoginPage,
	],
	providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, LoginProvider, AccountProvider]
})

export class AppModule {}
