import { Component, OnInit, ElementRef, OnDestroy, Input } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Location } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() showMenuToggler: boolean = true;
  @Input() showSideBarToggler: boolean = true;

  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  public isCollapsed = true;

  closeResult: string;

  constructor(location: Location, private element: ElementRef, private router: Router, private modalService: NgbModal) {
    this.location = location;
    this.sidebarVisible = false;
  }

  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    var navbar = document.getElementsByClassName('navbar')[0];
    if (window.innerWidth < 993 && !this.isCollapsed) {
      navbar.classList.add('bg-white');
      navbar.classList.remove('navbar-transparent');
    } else {
      navbar.classList.remove('bg-white');
      navbar.classList.add('navbar-transparent');
    }

    var title = navbar.getElementsByClassName('navbar-brand')[0];
    if (title && window.innerWidth < 993) {
      setTimeout(() => { title.classList.remove('glow'); }, 300);
    }
    else if (title) {
      title.classList.add('glow');
    }
  };

  ngOnInit() {
    this.updateColor();
    window.addEventListener("resize", this.updateColor.bind(this));
    this.listTitles = ROUTES.filter(listTitle => listTitle);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  ngAfterViewInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
  }

  // Show/Hide NavBar (only visible on small screens)
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    const glassPanel = document.getElementsByClassName("glass-panel")[0];
    const title = document.getElementsByClassName("navbar-brand")[0];
    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
      glassPanel.classList.add("hidden");
      title.classList.remove("glowOnHover");
    } else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
      glassPanel.classList.remove("hidden");
      title.classList.add("glowOnHover");
    }
  }

  sidebarOpen() {
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    if (window.innerWidth < 991) {
      mainPanel.style.position = "fixed";
    }

    setTimeout(function () {
      if (this.toggleButton) {
        this.toggleButton.classList.add("toggled");
      }
    }.bind(this), 500);

    const html = document.getElementsByTagName("html")[0];
    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }

  sidebarClose() {
    // Reposition Main Panel
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = "";
      }, 500);
    }

    // Revert Sidebar toggle button icon
    if (this.toggleButton) {
      this.toggleButton.classList.remove("toggled");
    }

    // Make the Sidebar disappear (if navigating on small width)
    const html = document.getElementsByTagName("html")[0];
    html.classList.remove("nav-open");

    // Update Sidebar Visibility status
    this.sidebarVisible = false;
  }

  // Show/Hide SideBar (only for small screens)
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }

    const html = document.getElementsByTagName("html")[0];
    var $layer: any = null;
    if (this.mobile_menu_visible == 1) {
      html.classList.remove("nav-open");
      $layer = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        this.toggleButton.classList.remove("toggled");
      }.bind(this), 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        this.toggleButton.classList.add("toggled");
      }.bind(this), 430);

      $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (html.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (html.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function () {
        //asign a function
        html.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function () {
          $layer.remove();
          this.toggleButton.classList.remove("toggled");
        }.bind(this), 400);
      }.bind(this);

      html.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }

    // Close also the NavBar menu if open 
    if (!this.isCollapsed) {
      this.collapse();
    }
  }

  getTitle() {
    let title = "BetParser";

    let currentPath = this.location.prepareExternalUrl(this.location.path());
    if (currentPath.charAt(0) === "#") {
      currentPath = currentPath.slice(1);
    }
    for (var i = 0; i < this.listTitles.length; i++) {
      if (this.listTitles[i].path === currentPath) {
        title += " / " + this.listTitles[i].title;
        break;
      }
    }

    return title;
  }

  isHome() {
    return this.getTitle().toLowerCase() === 'betparser';
  }

  open(content) {
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
    if (!this.isCollapsed) {
      this.collapse();
    }

    if (this.sidebarVisible && this.mobile_menu_visible) {
      this.sidebarToggle();
    }
  }

  ngOnDestroy() {
    window.removeEventListener("resize", this.updateColor);
  }
}
