import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import * as Actions from '../actions/root-container.actions';

@Component({
    selector: 'root-container',
    templateUrl: './root.container.html'
})
export class RootContainer {
    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch(new Actions.Initialized());
    }
}
