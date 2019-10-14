import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/components/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/components/icons/icons.component";
import { MapComponent } from "../../pages/map/components/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/components/notifications/notifications.component";
import { UserComponent } from "../../pages/user/components/user/user.component";
import { TablesComponent } from "../../pages/tables/components/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/components/typography/typography.component";
import { BetsComponent } from 'app/pages/bets/container/bets.component';


export const AdminLayoutRoutes: Routes = [
  { path: "bets",
    component: BetsComponent,
    children: [
      { path: "", loadChildren: "../../pages/bets/bets.module#BetsModule" }
    ]
  },
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
];
