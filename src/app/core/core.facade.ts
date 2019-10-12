import { Injectable } from "@angular/core";
import { CoreState } from "./state/core.state";
import { Observable } from "rxjs";
import { NavLink } from "./models/nav-link";
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class CoreFacade {

    private initialNavLinks: NavLink[] = [
        new NavLink(1, 'Home', 'Home Page', '../home', true, 'fa-home'),
        new NavLink(2, 'Bets', 'Bets', '../bets', false, 'fa-file-text-o'),
        new NavLink(3, 'Others', 'Others', '../others', false, 'fa-camera-retro')
    ];

    constructor(private coreState: CoreState, private router: Router) { }

    initializeNavLinks() {
        // Sets the Navigation Links to their initial state
        this.coreState.setNavLinks(this.initialNavLinks);

        // Starts an observable pipe to check for Url changes and update accordingly the activated menu item
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            map(e => (<NavigationEnd>e).url)
        ).subscribe(url => {
            this.coreState.activateNavLinkByUrl(url);
        });
    }

    getNavLinks(): Observable<NavLink[]> {
        // Just pass-through the State value
        return this.coreState.getNavLinks();
    }

    activateNavLinkById(id: number) {
        this.coreState.activateNavLinkById(id);
    }
}
