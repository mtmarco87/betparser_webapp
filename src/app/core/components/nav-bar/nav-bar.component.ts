import { Component, OnInit, Input } from '@angular/core';
import { NavLink } from 'app/core/models/nav-link';
import { CoreFacade } from 'app/core/core.facade';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  navLinks: NavLink[] = [];

  constructor(private coreFacade: CoreFacade) {
    this.coreFacade.initializeNavLinks();
  }

  ngOnInit() {
    this.coreFacade.getNavLinks().subscribe((newNavLinks) => this.navLinks = newNavLinks);
  }

  activateNavLink(id: number) {
    this.coreFacade.activateNavLink(id);
  }

}
