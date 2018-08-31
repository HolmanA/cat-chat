import { Component, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent { 
    constructor(@Inject(DOCUMENT) private document: Document, private authService: AuthService) {
        const token = environment.authToken || this.document.getElementById('authentication-token').innerText;
        this.authService.authToken = token;
    }
}
