/*
	Angular Module
	==============
	The NgModule bootstraps the components and services.
*/

// Import Angular and Ionic components
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Import base page
import { BaseView } from '../app/base-view';

// Import app pages
import { AccountListPage } from '../pages/account-list/account-list';
import { AccountViewPage } from '../pages/account-view/account-view';
import { AuctionListPage } from '../pages/auction-list/auction-list';
import { AuctionViewPage } from '../pages/auction-view/auction-view';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { CreateProfilePage } from '../pages/create-profile/create-profile';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LotPage } from '../pages/lot/lot';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { ReportsPage } from '../pages/reports/reports';

// Import providers/services
import { AccountProvider } from '../providers/account';
import { AuctionProvider } from '../providers/auction';
import { DataProvider } from '../providers/data';
import { LoginProvider } from '../providers/login';
import { LotProvider } from '../providers/lot';
import { ProfileProvider } from '../providers/profile';

// Import pipes for value transforms
import { CurrencyPipe } from '../pipes/currency';

// Bootstrap everything
@NgModule({
	declarations: [
		AccountListPage,
		AccountViewPage,
		AuctionListPage,
		AuctionViewPage,
		CreateAccountPage,
		CreateProfilePage,
		CurrencyPipe,
		HomePage,
		LoginPage,
		LotPage,
		MyApp,
		ProfileViewPage,
		ReportsPage
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		AccountListPage,
		AccountViewPage,
		AuctionListPage,
		AuctionViewPage,
		CreateAccountPage,
		CreateProfilePage,
		HomePage,
		LoginPage,
		LotPage,
		MyApp,
		ProfileViewPage,
		ReportsPage
	],
	providers: [
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		}, 
		AccountProvider,
		AuctionProvider,
		DataProvider,
		LoginProvider,
		LotProvider,
		ProfileProvider
	]
})

export class AppModule {}
