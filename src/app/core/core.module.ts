import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";

import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FixedPluginComponent } from './components/fixed-plugin/fixed-plugin.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  imports: [
    NgbModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FixedPluginComponent],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FixedPluginComponent]
})
export class CoreModule { }
