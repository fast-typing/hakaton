import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Attraction, User } from "../interfaces/interface";
import { CookiesService } from "./cookies.service";

@Injectable({
    providedIn: 'root',
})

export class HTTPService {
    constructor(
        private readonly http: HttpClient,
        private readonly cookiesService: CookiesService,
    ) { }

    login(body: any): Observable<{ access_token: string, refresh_token: string }> {
        return this._request('POST', 'login', body)
    }

    registration(body: any): Observable<string[]> {
        return this._request('POST', 'registration', body)
    }

    createAttr(body: any, token: string) {
        return this._request('POST', 'create_landmark', body, `token=${token}`)
    }

    addToFavorite(id: string, token: string) {
        return this._request('POST', 'add_to_favorite', { id: id }, `token=${token}`)
    }

    removeFromFavorite(id: string, token: string) {
        return this._request('POST', 'remove_from_favorite', { id: id }, `token=${token}`)
    }

    getAllAttr(): Observable<Attraction[]> {
        return this._request('GET', 'read_all_landmarks')
    }

    getFavoriteAttr(token: string): Observable<string[]> {
        return this._request('GET', 'favorite_landmarks', null, `token=${token}`)
    }

    getUserByToken(token: string): Observable<User> {
        return this._request('POST', 'get_user_by_token', { token: token })
    }

    _request(method: string, path: string, body?: any, query: string = ''): Observable<any> {
        const token = this.cookiesService.getCookie('token');
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`)
        }
        const options = {
            headers: headers,
            body: body,
        };
        const url = `http://127.0.0.1:8000/${path}?${query}`
        return this.http.request(method, url, options)
    }
}