import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MdDialog } from '@angular/material';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { NamePromptComponent } from './name-prompt/name-prompt.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  showLoader = false;

  items = this.af.database.list('/items');
  room = this.af.database.object('/room');

  roomSub: any;

  constructor(private af: AngularFire, private router: Router, public dialog: MdDialog) {
    this.showLoader = true;
  }

  ngOnInit() {
    this.af.auth.subscribe(auth =>{
      if(auth){
        console.log("Please enter your Display name");
      } else {
        console.log("Not authenticated");
      }
    });

    this.af.database.object('/room').subscribe(room => {
        this.roomSub = room;
        this.showLoader = false;
      }
    );
  }

  availableGameRooms = [];
  selectedGameRooms: any;

  gameRoom = {
    gameName: 'Name',
    maxPlayers: 3,
    joinedPlayers: 1,
    roomCreationTimestamp: '2012-02-02'
  }

  save(name: string, maxPlayers: number) {
    this.showLoader = true;
    this.af.database.object('/room').set({gameName: name, maxPlayers: maxPlayers});
    this.showLoader = false;
  }

  update(newName: string) {
    this.af.database.object('/room').update({ gameName: newName });
  }

  delete() {
    this.room.remove();
  }

  createGameRoom(name: string, maxPlayers: number){
    this.items.push({
      gameName: name,
      maxPlayers: maxPlayers,
      joinedPlayers: [],
      roomCreationTimestamp: new Date()
    });
  }

  loadAvailableGameRooms(){

  }

  joinQueue(){

  }

  leaveQueue(){

  }


  openDialog() {
      let dialogRef = this.dialog.open(NamePromptComponent);
    }

  navigateMain() {
      this.router.navigate(['main']);
  }

  public saveItem() {
      const itemObservable = this.af.database.object('/item');
      itemObservable.set({ name: 'ohter mother name!' });
  }

  public logout() {
      this.af.auth.logout();
  }

}
