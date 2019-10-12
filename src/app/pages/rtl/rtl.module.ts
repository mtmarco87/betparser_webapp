import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RtlComponent } from './components/rtl/rtl.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    RtlComponent
  ],
  exports: [
    RtlComponent
  ]
})
export class RtlModule { }
