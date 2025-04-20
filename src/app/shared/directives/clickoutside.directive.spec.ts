import { ElementRef } from "@angular/core";
import { ClickOutsideDirective } from "./clickoutside.directive";

describe("Directive: Clickoutside", () => {
  it("should be created", () => {
    const mockElementRef = { nativeElement: document.createElement("div") };
    const directive = new ClickOutsideDirective(mockElementRef as ElementRef);
    expect(directive).toBeTruthy();
  });
});
