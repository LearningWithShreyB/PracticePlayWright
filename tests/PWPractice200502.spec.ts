import { test, expect, Locator } from "@playwright/test";

test("Verify getByRole() Locators", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/tests/app.html");
    /*  const textbox: Locator = page.getByRole("textbox", { name: "Username" });
     await expect(textbox).toBeVisible(); */

    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Primary Action" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Toggle Button" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Div with button role" })).toBeVisible();
    await expect(page.getByRole("checkbox", { name: "Accept terms" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Home" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Products" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Contact" }).first()).toBeVisible();
});