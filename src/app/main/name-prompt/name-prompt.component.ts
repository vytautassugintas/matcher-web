import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-name-prompt',
    templateUrl: './name-prompt.component.html',
    styleUrls: ['./name-prompt.component.sass']
})
export class NamePromptComponent implements OnInit {

    credentials = { name: "" }

    constructor() { }

    ngOnInit() {
    }

    updateName(name: string){
      
    }

}
