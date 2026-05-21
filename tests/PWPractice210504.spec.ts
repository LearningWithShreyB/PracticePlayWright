import {test, expect, Locator} from "@playwright/test";

test('CSS Locators Practice02', async ({page})=>
{
    await page.goto('https://demowebshop.tricentis.com/');
    const para1: Locator = page.locator('p:nth-child(1)');
    await expect(para1).toBeVisible();
    await expect(para1).toHaveText("Welcome to the new Tricentis store!");
    const para2: Locator = page.locator('p:nth-child(2)');
    await expect(para2).toBeVisible();
    await expect(para2).toHaveText("Feel free to shop around and explore everything.");
})