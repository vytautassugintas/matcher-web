import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
  credentials = {
    email: "",
    password: ""
  };

  item: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire) {
    this.item = af.database.object('/item');

    this.af.auth.subscribe(auth => console.log(auth))
  }

  public saveItem(){
    const itemObservable = this.af.database.object('/item');
    itemObservable.set({ name: 'ohter mother name!'});
  }

  public signUp(email: string, password: string){
    this.af.auth.createUser({email: email, password: password})
  }

  public login(email: string, password: string){
    console.log(email, password);
    this.af.auth.login({email: email, password: password});
  }

  public logout() {
    this.af.auth.logout();
 }

}
