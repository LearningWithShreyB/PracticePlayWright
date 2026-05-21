import {test, expect, Locator} from "@playwright/test";

test('CSS Locators Practice02', async ({page})=>
{
    await page.goto('https://demowebshop.tricentis.com/');
    const registerLink: Locator = page.locator('.ico-register');
    await expect(registerLink).toBeVisible();
    await expect(page.locator('.ico-login')).toBeVisible();
    
})