import { Component, OnInit, Input } from "@angular/core";


@Component({
  selector: "app-fixed-plugin",
  templateUrl: "./fixed-plugin.component.html",
  styleUrls: ["./fixed-plugin.component.css"]
})
export class FixedPluginComponent implements OnInit {
  @Input() canChangeSidebarColor: boolean = true;
  @Input() canChangeDashboardColor: boolean = true;
  
  
  public sidebarColor: string = "red";

  constructor() {
  }

  ngOnInit() {
  }

  changeSidebarColor(color) {
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

  changeDashboardColor(color) {
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
      body.classList.add(color);
    }
    else if (body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }
}
