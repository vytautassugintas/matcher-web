import { PushNotificationsService } from "../../../node_modules/angular2-notifications/src/push-notifications.service";
import { NotificationsService } from "../../../node_modules/angular2-notifications/src/notifications.service";
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

    currentUser: any;

    items = this.af.database.list('/items');

    rooms = this.af.database.list('/room');

    itemsSub = [];
    roomSub: any;

    constructor(private af: AngularFire, private router: Router, public dialog: MdDialog, private notificationService: NotificationsService, private pushNotifications: PushNotificationsService) {
        this.showLoader = true;
    }

    ngOnInit() {
        this.pushNotifications.requestPermission()

        this.af.auth.subscribe(auth => {
            if (auth) {
                this.currentUser = auth;
            } else {
                console.log("Not authenticated");
            }
        });

        this.items = this.af.database.list('/room', { preserveSnapshot: true });
        this.items
          .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              if(this.userAlreadyInQueue(this.currentUser.uid, snapshot.val().joinedPlayers)){
                  if(snapshot.val().maxPlayers <= this.getJoinedPlayers(snapshot.val().joinedPlayers).length){
                    this.pushNotifications.create('All players joined', { body: 'Go Play ' + snapshot.val().gameName }).subscribe(
                        res => console.log("Notification res: " + res),
                        err => console.log("Notification err: " + err)
                    )
                  } else {
                    this.pushNotifications.create('Players in queue', { body: 'In ' + snapshot.val().gameName + ' queue are ' + this.getJoinedPlayers(snapshot.val().joinedPlayers).length + ' players, game will start when ' + (snapshot.val().maxPlayers - this.getJoinedPlayers(snapshot.val().joinedPlayers).length) + ' more will join.' }).subscribe(
                        res => console.log("Notification res: " + res),
                        err => console.log("Notification err: " + err)
                    )
                  }
              }
            });
          })
    }

    availableGameRooms = [];
    selectedGameRooms: any;

    gameRoom = {
        gameName: 'Name',
        maxPlayers: 3,
        joinedPlayers: 1,
        roomCreationTimestamp: '2012-02-02'
    }

    getPlayers(id: string) {
        this.af.database.list('/items/' + id + '/joinedPlayers');
    }

    save(name: string, maxPlayers: number) {
        this.af.database.object('/room').set({ gameName: name, maxPlayers: maxPlayers });
    }

    update(newName: string) {
        this.af.database.object('/room').update({ gameName: newName });
    }

    createGameRoom(name: string, maxPlayers: number) {
        this.items.push({
            gameName: name,
            maxPlayers: maxPlayers,
            joinedPlayers: [],
            roomCreationTimestamp: new Date()
        });
    }

    loadAvailableGameRooms() {

    }

    joinQueue(room) {
        if (room.maxPlayers <= this.getJoinedPlayers(room.joinedPlayers).length) {
            this.notificationService.info('Queue full', 'Can not join', true);
        } else if (this.userAlreadyInQueue(this.currentUser.uid, room.joinedPlayers)) {
            this.notificationService.info('Already in queue', 'Can not join', true);
        } else {
            this.af.database.list('/room/' + room.$key + '/joinedPlayers').push({ player: this.currentUser.uid, email: this.currentUser.auth.email });
            this.notificationService.success('Joined', 'You have joined to queue', true);
        }
    }

    leaveQueue(room) {
        if (!this.userAlreadyInQueue(this.currentUser.uid, room.joinedPlayers)) {
            this.notificationService.error('Not in queue', 'You are not in queue', true);
        } else {
            this.af.database.list('/room/' + room.$key + '/joinedPlayers').remove(this.getPlayerKey(room.joinedPlayers, this.currentUser.uid));
            this.notificationService.info('Left', 'You have left queue', true);
        }
    }

    getJoinedPlayers(players): Array<any> {
        var playersList = [];
        for (var key in players)
            playersList.push(players[key]);
        return playersList;
    }

    getPlayerKey(players, id): string {
        for (var key in players)
            if (players[key].player == id)
                return key;
        return null;
    }

    userAlreadyInQueue(userId, players): boolean {
        for (var player of this.getJoinedPlayers(players))
            if (userId == player.player)
                return true;
        return false;
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
