import { test, expect, Locator } from "@playwright/test";

test("Verify getByAltText() locator", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/tests/app.html");
    const logo: Locator = page.getByAltText("logo image");
    await expect(logo).toBeVisible();
});