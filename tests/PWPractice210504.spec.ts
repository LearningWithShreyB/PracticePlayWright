import {test, expect, Locator} from "@playwright/test";

test('CSS Locators Practice02', async ({page})=>
{
    await page.goto('https://demowebshop.tricentis.com/');
    const para1: Locator = page.locator('p:nth-child(1)');
    await expect(para1).toBeVisible();
    await expect(para1).toHaveText("Welcome to the new Tricentis store!");
})