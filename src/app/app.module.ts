import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NamePromptComponent } from './main/name-prompt/name-prompt.component';

import 'hammerjs';

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

const appRoutes: Routes = [
  {
    path: '',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: '**',
    component: SignInComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignInComponent,
    SignUpComponent,
    NamePromptComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot()
  ],
  entryComponents: [NamePromptComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
