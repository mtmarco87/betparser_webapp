import { Component, OnInit, ElementRef, OnDestroy, Input } from "@angular/core";
import { filter } from 'rxjs/operators';
import { Routes } from "../sidebar/sidebar.component";
import { RouteInfo } from 'app/core/models/RouteInfo';
import { Router, NavigationEnd } from "@angular/router";
import { Location } from "@angular/common";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppSettings } from 'app/core/models/AppSettings';
import { Subscription } from 'rxjs';
import { CoreState } from 'app/core/state/core.state';


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() showMenuToggler: boolean = true;
  @Input() showSideBarToggler: boolean = true;

  reducedViewport: boolean = false;
  menuCollapsed: boolean = true;
  closeResult: string;
  infobarStatus: string;
  private sidebarVisible: boolean = true;
  private listRoutes: RouteInfo[] = Routes.filter(listTitle => listTitle);
  private routerEventsSubscription: Subscription = null;
  private infobarStatusSubscription: Subscription = null;

  constructor(private location: Location, private element: ElementRef, private router: Router, private modalService: NgbModal,
    private coreState: CoreState) { }

  // Function that detects viewport size change, determining:
  // - Addition of color white/transparent to the navbar on resize (this is for the collapsible menu)
  // - Addition/removal of glow effect to title
  private onResize = () => {
    if (window.innerWidth < 993) {
      this.reducedViewport = true;
    } else {
      this.reducedViewport = false;
    }
  };

  ngOnInit() {
    // Detects viewport size, influencing navbar colors and applied effects
    this.onResize();
    window.addEventListener("resize", this.onResize);

    // On page creation we close the SideBar
    this.sidebarToggle();
    // Subscribe to router location changes to close sidebar if open
    this.routerEventsSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (this.sidebarVisible) {
        this.sidebarToggle();
      }
    });

    // Subscribe to infobar status text change
    this.infobarStatusSubscription = this.coreState.getInfobarStatus().subscribe((status) => { this.infobarStatus = status; });
  }

  // Show/Hide collapsible Menu (only visible on small screens) and apply specific style changes
  collapse() {
    this.menuCollapsed = !this.menuCollapsed;
  }

  // Show/Hide SideBar (only for small screens)
  sidebarToggle() {
    const html: HTMLElement = document.getElementsByTagName("html")[0];
    const sidebarToggleButton: HTMLElement = this.element.nativeElement.getElementsByClassName("navbar-toggler")[0];
    const mainPanel: HTMLElement = <HTMLElement>(document.getElementsByClassName("main-panel")[0]);
    let $layer: HTMLElement = null;

    if (this.sidebarVisible) {
      // Hide SideBar
      html.classList.remove("nav-open");
      // Show the SideBar open button (if enabled in the component)
      if (sidebarToggleButton !== undefined && sidebarToggleButton !== null) {
        sidebarToggleButton.classList.remove("toggled");
        // Remove SideBar close button
        $layer = <HTMLElement>(document.getElementsByClassName("close-layer")[0]);
        if ($layer) {
          $layer.remove();
        }
      }
      // Unlock Main Panel (in case of small screen we lock the main panel when Sidebar is open)
      if (window.innerWidth < 991) {
        mainPanel.style.position = "";
      }

      this.sidebarVisible = false;
    } else {
      // Show SideBar
      html.classList.add("nav-open");
      // Hide the SideBar open button (if enabled in the component)
      if (sidebarToggleButton) {
        sidebarToggleButton.classList.add("toggled");
        // Create SideBar close button
        $layer = document.createElement("div");
        $layer.classList.add("close-layer", "visible");
        $layer.onclick = function () {
          this.sidebarToggle();
        }.bind(this);
        if (mainPanel !== undefined && mainPanel !== null) {
          mainPanel.appendChild($layer);
        } else if (html.classList.contains("off-canvas-sidebar")) {
          document.getElementsByClassName("wrapper-full-page")[0].appendChild($layer);
        }
      }
      // Fix Main Panel position
      if (window.innerWidth < 991) {
        mainPanel.style.position = "fixed";
      }

      // Update Sidebar Visibility status
      this.sidebarVisible = true;
    }

    // Also close the NavBar menu if open 
    if (!this.menuCollapsed) {
      this.collapse();
    }
  }

  getTitle() {
    let title = AppSettings.Title;

    // Here we extract from the browser Url the current path
    let currentPath = this.location.prepareExternalUrl(this.location.path());
    if (currentPath.charAt(0) === AppSettings.LocationHash) {
      currentPath = currentPath.slice(1);
    }
    // From the Url path and the corresponding Sidebar route, we can detect the page title
    const matchingRoute = this.listRoutes.find((route) => route.path === currentPath);
    if (matchingRoute !== undefined && matchingRoute !== null) {
      title += AppSettings.TitleDivider + matchingRoute.title;
    }

    return title;
  }

  open(content) {
    // Open a modal
    this.modalService.open(content, { windowClass: 'modal-search' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onClickOutside() {
    if (!this.menuCollapsed) {
      this.collapse();
    }

    if (this.sidebarVisible) {
      this.sidebarToggle();
    }
  }

  ngOnDestroy() {
    window.removeEventListener("resize", this.onResize);
    this.routerEventsSubscription.unsubscribe();
    this.infobarStatusSubscription.unsubscribe();
  }
}
