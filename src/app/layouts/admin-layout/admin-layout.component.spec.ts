import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AdminLayoutComponent } from "./admin-layout.component";
import { SidebarComponent } from "app/core/components/sidebar/sidebar.component";
import { NavbarComponent } from "app/core/components/navbar/navbar.component";
import { FooterComponent } from "app/core/components/footer/footer.component";
import { FixedPluginComponent } from "app/core/components/fixed-plugin/fixed-plugin.component";
import { SpinnerComponent } from "app/shared/components/spinner/spinner.component";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";

describe("AdminLayoutComponent", () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminLayoutComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent,
        FixedPluginComponent,
        SpinnerComponent,
      ],
      imports: [RouterTestingModule, NgbCollapseModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
