import {test,expect, Locator} from '@playwright/test';

test('Verifying Mouse Actions-Mouse Hover',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const btn01:Locator= page.locator(".dropbtn");
    await btn01.hover();
    await expect(btn01).toBeVisible();
    await page.waitForTimeout(2000);

    const btn02:Locator= page.getByRole('link',{name:'Mobiles'});
    await btn02.hover();
    await expect(btn02).toBeVisible();
    await page.waitForTimeout(2000);


})