import { Component, OnInit, ElementRef } from '@angular/core';


@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit() {
    // Disable animations/transitions until the page has loaded.
    const homePage: HTMLElement = this.element.nativeElement;
    const banner = homePage.getElementsByTagName('section')[0]
    banner.classList.add('is-loading');

    window.setTimeout(function () {
      banner.classList.remove('is-loading');
    }, 100);
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
