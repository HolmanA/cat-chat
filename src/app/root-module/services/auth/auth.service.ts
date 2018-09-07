import { Injectable } from '@angular/core';

/**
 * Service used to store and retrieve authentication tokens
 */
@Injectable()
export class AuthService {
    private _authToken: string;

    /**
     * Sets the token if one is not already set
     * @param token the token
     */
    set authToken(token: string) {
        if (!this._authToken) {
            this._authToken = token;
        }
    }

    /**
     * Gets the token
     */
    get authToken(): string {
        return this._authToken;
    }
}