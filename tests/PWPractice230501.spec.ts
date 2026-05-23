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

    // tag[attribute=value]
    page.goto("https://www.google.com/");
    const tag3: Locator = page.locator("[role='img']");
    await expect(tag3).toBeVisible();
    await page.waitForTimeout(2000);

    //tag.class[attribute=value]
    await expect(page.locator(".gb_4[aria-label='Search for Images ']")).toBeVisible();
    await page.waitForTimeout(2000);

    const tag4: Locator = page.locator(".gLFyf[title='Search']");
    await tag4.fill("Playwright");
    await expect(tag4).toBeVisible();
    await page.waitForTimeout(2000);

})