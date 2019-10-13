import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeLayoutRoutes } from './home-layout.routing'
import { HomeLayoutComponent } from './home-layout.component'
import { CoreModule } from 'app/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(HomeLayoutRoutes),
    CoreModule,
  ],
  declarations: [
    HomeLayoutComponent
  ],
  exports: [
    HomeLayoutComponent
  ]
})
export class HomeLayoutModule { }
