import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    private _authToken: string;

    set authToken(token: string) {
        if (!this._authToken) {
            this._authToken = token;
        }
    }

    get authToken(): string {
        return this._authToken;
    }
}