import { test, expect } from "@playwright/test";
import { example1, example2, example3, example4 } from "@repo/fixtures";

test.beforeEach(async ({ page }) => {
  await page.unroute("/api/odds");
  await page.unroute("/api/millennium");
});

test("should show loading status after uploading file", async ({ page }) => {
  await page.route("/api/odds", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    route.continue();
  });
  await page.goto("/");
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByText("Upload empire plans").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles({
    name: "file",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(example1.empireJSON)),
  });
  await expect(page.getByText("Analysing plans...")).toHaveCount(1);
});

const examples = [example1, example2, example3, example4].forEach(
  (example, idx) => {
    test(`should process file after uploading it using example ${idx}`, async ({
      page,
    }) => {
      await page.route("/api/odds", async (route) => {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(example.resultsJSON),
          headers: {
            "content-type": "application/json",
          },
        });
      });
      await page.goto("/");
      const fileChooserPromise = page.waitForEvent("filechooser");
      await page.getByText("Upload empire plans").click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles({
        name: "file",
        mimeType: "application/json",
        buffer: Buffer.from(JSON.stringify(example.empireJSON)),
      });
      await expect(page.getByText("Probability of success")).toHaveCount(1);
      await expect(
        page.getByText(
          `${(example.resultsJSON.successProbability * 100).toFixed(0)}%`
        )
      ).toHaveCount(1);
    });
  }
);
