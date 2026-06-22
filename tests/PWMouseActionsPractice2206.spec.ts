import {test,expect, Locator} from '@playwright/test';

test('Verifying Mouse Actions-Mouse Hover',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const btn01:Locator= page.locator(".dropbtn");
    await btn01.hover();
    await expect(btn01).toBeVisible();

    await page.waitForTimeout(3000);
})