import { Component, Inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngxs/store';
import * as Actions from './app.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit { 
    constructor(@Inject(DOCUMENT) private document: Document, private authService: AuthService, private store: Store) {
        const token = environment.authToken || this.document.getElementById('authentication-token').innerText;
        this.authService.authToken = token;
    }

    ngOnInit(): void {
        this.store.dispatch(new Actions.Initialized());
    }
}
