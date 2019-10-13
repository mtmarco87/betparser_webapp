import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthLayoutRoutes } from './auth-layout.routing';
import { AuthLayoutComponent } from './auth-layout.component';
import { RtlModule } from 'app/pages/rtl/rtl.module';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    RtlModule
  ],
  declarations: [
    AuthLayoutComponent
  ],
  exports: [
    AuthLayoutComponent
  ]
})
export class AuthLayoutModule { }
