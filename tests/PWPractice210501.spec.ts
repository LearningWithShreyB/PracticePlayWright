import {test, expect, Locator} from "@playwright/test";

test('CSS Locators Practice 01', async ({page})=>
{
    await page.goto('https://demowebshop.tricentis.com/');

    await expect(page.locator('img[alt="Tricentis Demo Web Shop"]')).toBeVisible();
})