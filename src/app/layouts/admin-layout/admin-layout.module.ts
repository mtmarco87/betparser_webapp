import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { AdminLayoutComponent } from './admin-layout.component';
import { CoreModule } from 'app/core/core.module';
import { DashboardModule } from 'app/pages/dashboard/dashboard.module';
import { IconsModule } from 'app/pages/icons/icons.module';
import { MapModule } from 'app/pages/map/map.module';
import { NotificationsModule } from 'app/pages/notifications/notifications.module';
import { TablesModule } from 'app/pages/tables/tables.module';
import { TypographyModule } from 'app/pages/typography/typography.module';
import { UserModule } from 'app/pages/user/user.module';
import { BetsModule } from 'app/pages/bets/bets.module';


@NgModule({
  imports: [
    NgbModule,
    RouterModule.forChild(AdminLayoutRoutes),
    CoreModule,
    DashboardModule,
    BetsModule,
    IconsModule,
    MapModule,
    NotificationsModule,
    TablesModule,
    TypographyModule,
    UserModule,
    SharedModule
  ],
  declarations: [
    AdminLayoutComponent
  ],
  exports: [
    AdminLayoutComponent
  ]
})
export class AdminLayoutModule { }
