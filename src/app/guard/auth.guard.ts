import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { CookiesService } from "../services/cookies.service";

@Injectable()
export class AuthGuard {
    constructor(
        private readonly cookiesService: CookiesService,
        private readonly route: Router,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.cookiesService.getCookie('access_token');
        if (!token) {
            this.route.navigate(['/'])
            return false
        }
        return true
    }
}