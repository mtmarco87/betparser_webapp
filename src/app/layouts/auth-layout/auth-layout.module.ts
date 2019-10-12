import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthLayoutRoutes } from './auth-layout.routing';
import { AuthLayoutComponent } from './auth-layout.component';
import { CoreModule } from 'app/core/core.module';
import { RtlModule } from 'app/pages/rtl/rtl.module';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    CoreModule,
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
