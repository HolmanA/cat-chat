import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';

@Component({
    selector: 'user-container',
    templateUrl: './user.container.html'
})
export class UserContainer {
    constructor(private store: Store) { }
}
