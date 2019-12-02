import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeLayoutRoutes } from './home-layout.routing';
import { HomeLayoutComponent } from './home-layout.component';
import { CoreModule } from 'app/core/core.module';


@NgModule({
  imports: [
    RouterModule.forChild(HomeLayoutRoutes),
    CoreModule
  ],
  declarations: [
    HomeLayoutComponent
  ],
  exports: [
    HomeLayoutComponent
  ]
})
export class HomeLayoutModule { }
