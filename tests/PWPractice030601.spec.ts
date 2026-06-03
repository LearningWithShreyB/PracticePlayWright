import {test,expect} from '@playwright/test';

test('Verifying the dropdown - Part2'async({page})=>
{
    await page.goto("https://www.bstackdemo.com/");
    const dropdown01=page.locator("div.sort>select");
    await expect(dropdown01).toBeVisible();
    await expect(dropdown01).toBeEnabled();
})