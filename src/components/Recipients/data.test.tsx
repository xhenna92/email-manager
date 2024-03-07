const {isValidEmail} = require("./data");

test("empty string is not an email", () => {
  expect(isValidEmail("")).toBe(false);
});

test("Should return false when not valid email", () => {
  expect(isValidEmail("cake")).toBe(false);
});

test("Should return true when valid email", () => {
  const result = isValidEmail("henna@somewhere.com");
  expect(result).toBe(true);
});
