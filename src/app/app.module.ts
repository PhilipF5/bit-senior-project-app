import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AdminHomePage } from '../pages/admin-home/admin-home';
import { LoginPage } from '../pages/login/login';
import { LoginProvider } from '../providers/login';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		AdminHomePage,
		LoginPage
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		AdminHomePage,
		LoginPage
	],
	providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, LoginProvider]
})

export class AppModule {}
