import { test, expect, Locator } from "@playwright/test";

test("Verify getByText() Locators", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/tests/app.html");
    /*  const textbox: Locator = page.getByRole("textbox", { name: "Username" });
     await expect(textbox).toBeVisible(); */

    await expect(page.getByText("List item 1")).toBeVisible();
    await expect(page.getByText("List item 2 with ")).toBeVisible();
    await expect(page.getByText("Special: Unique text identifier")).toBeVisible();
});