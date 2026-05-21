import {test, expect, Locator} from "@playwright/test";

test('CSS Locators Practice02', async ({page})=>
{
    await page.goto('https://demowebshop.tricentis.com/');
    const registerLink: Locator = page.locator('#small-searchterms');
    await registerLink.fill("laptop");
    await expect(registerLink).toBeVisible();
})