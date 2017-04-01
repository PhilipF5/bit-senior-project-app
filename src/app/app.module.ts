import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoginProvider } from '../providers/login';
import { AccountProvider } from '../providers/account';
import { AuctionProvider } from '../providers/auction';
import { ProfileProvider } from '../providers/profile';
import { LotProvider } from '../providers/lot';
import { CurrencyPipe } from '../pipes/currency';
import { AccountViewPage } from '../pages/account-view/account-view';
import { AuctionListPage } from '../pages/auction-list/auction-list';
import { AuctionViewPage } from '../pages/auction-view/auction-view';
import { LotPage } from '../pages/lot/lot';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { AccountListPage } from '../pages/account-list/account-list';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { CreateProfilePage } from '../pages/create-profile/create-profile';
import { ReportsPage } from '../pages/reports/reports';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		LoginPage,
		CurrencyPipe,
		AccountViewPage,
		AuctionListPage,
		AuctionViewPage,
		LotPage,
		ProfileViewPage,
		AccountListPage,
		CreateAccountPage,
		CreateProfilePage,
		ReportsPage
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		LoginPage,
		AccountViewPage,
		AuctionListPage,
		AuctionViewPage,
		LotPage,
		ProfileViewPage,
		AccountListPage,
		CreateAccountPage,
		CreateProfilePage,
		ReportsPage
	],
	providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, LoginProvider, AccountProvider, AuctionProvider, ProfileProvider, LotProvider]
})

export class AppModule {}
