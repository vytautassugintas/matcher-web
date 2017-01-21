import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {

      credentials = {
          email: "",
          password: ""
      };

    constructor(public af: AngularFire) {

    }

    ngOnInit() {
    }

    public login(email: string, password: string) {
        this.af.auth.login({ email: email, password: password });
    }

}
