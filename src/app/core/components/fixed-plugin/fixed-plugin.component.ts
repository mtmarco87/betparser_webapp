import { Component, OnInit, Input } from "@angular/core";
import { CoreState } from 'app/core/state/core.state.ts';
import { UserSettings } from 'app/core/models/UserSettings';


@Component({
  selector: "app-fixed-plugin",
  templateUrl: "./fixed-plugin.component.html",
  styleUrls: ["./fixed-plugin.component.css"]
})
export class FixedPluginComponent implements OnInit {
  @Input() canChangeSidebarColor: boolean = true;
  @Input() canChangeDashboardColor: boolean = true;

  public sidebarColor: string = "red";
  private userSettings: UserSettings;

  constructor(private coreState: CoreState) { }

  ngOnInit() {
    this.coreState.getUserSettings().subscribe((userSettings) => {
      this.userSettings = userSettings;
      this.applySidebarColor(userSettings.SidebarColor);
      this.applyDashboardColor(userSettings.BackgroundColor);
    });
  }

  changeSidebarColor(color) {
    let userSettings = { ...this.userSettings, SidebarColor: color };
    this.coreState.setUserSettings(userSettings);
  }

  changeDashboardColor(color) {
    let userSettings = { ...this.userSettings, BackgroundColor: color };
    this.coreState.setUserSettings(userSettings);
  }

  applySidebarColor(color) {
    const sidebar = document.getElementsByClassName('sidebar')[0];
    const mainPanel = document.getElementsByClassName('main-panel')[0];
    const wrapper = document.getElementsByClassName('wrapper')[0];
    const spinner = document.getElementsByClassName('spinner')[0];

    this.sidebarColor = color;

    if (sidebar != undefined) {
      sidebar.setAttribute('data', color);
    }
    if (mainPanel != undefined) {
      mainPanel.setAttribute('data', color);
    }
    if (wrapper != undefined) {
      wrapper.setAttribute('data', color);
    }
    if (spinner != undefined) {
      spinner.setAttribute('data', color);
    }
  }

  applyDashboardColor(color) {
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
      body.classList.add(color);
    }
    else if (body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }
}
