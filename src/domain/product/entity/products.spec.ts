import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let product = new Product("", "Tests");
    }).toThrowError("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let product = new Product("123", "");
    }).toThrowError("product: Name is required");
  });

  it("should throw error when name is and id are empty", () => {
    expect(() => {
      let product = new Product("", "");
    }).toThrowError("product: Id is required,product: Name is required");
  });
});
