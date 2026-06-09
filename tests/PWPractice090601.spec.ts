import {test,expect, Locator} from '@playwright/test';

test('Verifying static table',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table:Locator=page.locator("table[name='BookTable']");
    await expect(table).toBeVisible();

})