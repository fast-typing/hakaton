import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Attraction } from "../interfaces/interface";
import { CookiesService } from "./cookies.service";

@Injectable({
    providedIn: 'root',
})


export class HTTPService {
    constructor(
        private readonly http: HttpClient,
        private readonly cookiesService: CookiesService,
    ) { }

    getAttractions(): Observable<Attraction[]> {
        return this._request('GET', 'attractions')
    }

    _request(method: string, path: string, body?: any): Observable<any> {
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
        const url = window.location.origin
        return this.http.request(method, url + path, options)
    }
}