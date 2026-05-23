import { test, expect, Locator } from "@playwright/test";

test("Verify CSS Locators", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");

    // logo
    const tag1: Locator = page.locator("img[alt='Tricentis Demo Web Shop']");
    await expect(tag1).toBeVisible();

    // Products containing "computer" in href attribute
    const tag2: Locator = page.locator("h2>a[href*='computer']");
    console.log("Names of computer related products: ", await tag2.allTextContents());
    console.log("First value: ", await tag2.first().textContent());
    console.log("Second value: ", await tag2.nth(1).textContent());
    console.log("Third value: ", await tag2.nth(2).textContent());
    console.log("Fourth value: ", await tag2.last().textContent());
    console.log("Total Number of computer related products: ", await tag2.count());
    await expect(tag2).toHaveCount(4);

    let totalProducts:Array<string> = await tag2.allTextContents();

    for(let value of totalProducts)
    {
        console.log(value);
    }

    /* // tag[attribute=value]
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
    await page.waitForTimeout(2000); */

})