import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NotificationsComponent } from './components/notifications/notifications.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    NotificationsComponent
  ],
  exports: [
    NotificationsComponent
  ]
})
export class NotificationsModule { }
