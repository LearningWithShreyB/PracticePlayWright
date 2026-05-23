import { test, expect, Locator } from "@playwright/test";

test("Verify CSS Locators", async ({ page }) => {
    page.goto("https://demowebshop.tricentis.com/");

    // tag#id
    const idtag: Locator = page.locator("#small-searchterms");
    await idtag.fill("Laptop");
    await expect(idtag).toBeVisible();
    await page.waitForTimeout(2000);


    // tag.class
     const classtag: Locator = page.locator(".search-box-text");
    await classtag.fill("T-Shirts");
    await expect(classtag).toBeVisible();
    await page.waitForTimeout(2000);
})