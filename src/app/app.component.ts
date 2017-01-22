import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {

    item: FirebaseObjectObservable<any>;

    public options = {
      position: ["bottom", "left"],
      timeOut: 5000,
      showProgressBar: false,
      preventDuplicates: true,
      animate: "scale",
      lastOnBottom: true
    }

    constructor(private af: AngularFire, private router: Router) {
        this.item = af.database.object('/item');
        this.af.auth.subscribe(auth =>{
          if(auth){
            this.router.navigate(['main']);
          } else {
          console.log("Not authenticated")
          }
        });
    }

}
