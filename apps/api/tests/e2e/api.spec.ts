import test, { expect } from "@playwright/test";
import {
  example1,
  example2,
  example3,
  example4
} from "@repo/fixtures";

test("should fail and return message if invalid payload is provided", async ({
  request,
}) => {
  const response = await request.post(`/odds`, {
    data: {},
  });
  const result = await response.json();
  expect(response.status()).toBe(400);
  expect(result).toMatchObject({
    error: {
      message: "Invalid empire data",
    },
  });
});

[example1, example2, example3, example4].forEach((example, idx) => {
  test(`should return corrent response for example ${idx}`, async ({
    request,
  }) => {
    const response = await request.post(`/odds`, {
      data: example.empireJSON,
    });
    const result = await response.json();
    expect(response.status()).toBe(200);
  });
});
