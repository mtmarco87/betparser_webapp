import { Component, OnInit } from "@angular/core";
import { CoreState } from 'app/core/state/core.state';


@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  isAppLoading = false;

  constructor(private coreState: CoreState) {
    // Subscribe App loading status to spinner component
    this.coreState.getIsAppLoading().subscribe((isAppLoading) => this.isAppLoading = isAppLoading);
  }

  ngOnInit() { }

  scrollHandler(scrollStatus: string) {
    // should log top or bottom
    this.coreState.setScrollStatus(scrollStatus);
  }
}
