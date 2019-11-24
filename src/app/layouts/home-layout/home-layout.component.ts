import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  constructor(private element: ElementRef, private router: Router) { }

  ngOnInit() {
    // Disable animations/transitions until the page has loaded (and then the css animations can start).
    const homePage: HTMLElement = this.element.nativeElement;
    const banner = homePage.getElementsByTagName('section')[0]
    banner.classList.add('is-loading');

    window.setTimeout(function () {
      banner.classList.remove('is-loading');
    }, 100);
  }

  startButtonCallback() {
    console.log("startButtonCallback");
    setTimeout(() => {
      if (window['showAndroidToast']) {
        window['showAndroidToast']();
      };
      this.router.navigate(['/bets/analysis'])
    }, 1000);
  }
}
