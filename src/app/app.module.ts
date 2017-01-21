import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

const myFirebaseConfig = {
  apiKey: "AIzaSyDeSLDhiKX1cXFelc1Zz1F76lTxOy8K8FQ",
  authDomain: "matcher-40e60.firebaseapp.com",
  databaseURL: "https://matcher-40e60.firebaseio.com",
  storageBucket: "matcher-40e60.appspot.com",
  messagingSenderId: "800915537902"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
