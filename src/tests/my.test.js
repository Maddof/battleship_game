import add from "../index";

describe("index.js", function () {
  test("add two numbers", function () {
    expect(add(1, 2)).toBe(3);
  });
});
