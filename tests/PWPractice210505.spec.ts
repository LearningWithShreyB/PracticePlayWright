import {test, expect, Locator} from "@playwright/test";

test('CSS Locators Practice02', async ({page})=>
{
    await page.goto('https://demowebshop.tricentis.com/');
    const price: Locator = page.locator("body > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(2) > input:nth-child(1)");
    await expect(price).toBeEnabled();
    await expect(price).toHaveText("Add to cart");
})