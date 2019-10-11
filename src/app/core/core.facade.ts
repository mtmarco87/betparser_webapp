import { Injectable } from "@angular/core";
import { CoreModule } from "./core.module";
import { CoreState } from "./state/core.state";
import { Observable } from "rxjs";
import { NavLink } from "./models/nav-link";



@Injectable({
    providedIn: 'root'
})
export class CoreFacade {

    private initialNavLinks: NavLink[] = [
        new NavLink(1, 'Home', 'Home Page', '../home', true, 'fa-home' ),
        new NavLink(2, 'Bets', 'Bets', '../bets', false, 'fa-file-text-o' ),
        new NavLink(3, 'Others', 'Others', '../home', false, 'fa-camera-retro' )
    ];

    constructor(private coreState: CoreState) { }

    initializeNavLinks() {
        this.coreState.setNavLinks(this.initialNavLinks);
    }
    
    getNavLinks(): Observable<NavLink[]> {
        // Just pass-through the State value
        return this.coreState.getNavLinks();
    }

    activateNavLink(id: number) {
        this.coreState.activateNavLink(id);
    }

}
