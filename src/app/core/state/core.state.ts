import { NavLink } from "../models/nav-link";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root',
})
export class CoreState {

    private navLinks = new BehaviorSubject<NavLink[]>(null);

    getNavLinks(): Observable<NavLink[]> {
        return this.navLinks.asObservable();
    }

    setNavLinks(navLinks: NavLink[]) {
        this.navLinks.next(navLinks);
    }

    activateNavLink(id: number) {
        const links = this.navLinks.getValue();
        const oldActiveIndex = links.findIndex(navLink => navLink.isActive);
        const newActiveIndex = links.findIndex(navLink => navLink.id == id);

        if (oldActiveIndex >= 0) {
            links[oldActiveIndex].isActive = false;
        }
        links[newActiveIndex].isActive = true;

        this.navLinks.next([...links]);
    }
}