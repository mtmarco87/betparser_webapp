import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeLayoutComponent } from "./home-layout.component";
import { NavbarComponent } from "app/core/components/navbar/navbar.component";
import { FooterComponent } from "app/core/components/footer/footer.component";
import { FixedPluginComponent } from "app/core/components/fixed-plugin/fixed-plugin.component";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterTestingModule } from "@angular/router/testing";

describe("HomeLayoutComponent", () => {
  let component: HomeLayoutComponent;
  let fixture: ComponentFixture<HomeLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeLayoutComponent,
        NavbarComponent,
        FooterComponent,
        FixedPluginComponent,
      ],
      imports: [NgbCollapseModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
