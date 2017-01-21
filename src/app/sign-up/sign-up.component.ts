import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

      credentials = {
          email: "",
          password: ""
      };

      constructor(public af: AngularFire) {

      }

      ngOnInit() {
      }

      public signUp(email: string, password: string) {
          this.af.auth.createUser({ email: email, password: password })
      }

}
