import { FilterNaPipe } from "./filter-na.pipe";

describe("Pipe: Filter N/A", () => {
  it("should be created", () => {
    let pipe = new FilterNaPipe();
    expect(pipe).toBeTruthy();
  });
});
