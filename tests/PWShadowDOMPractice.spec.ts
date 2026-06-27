import {test,expect} from '@playwright/test';

test('Verifying Shadow DOM',async({page})=>{
    await page.goto("https://shop.polymer-project.org/");
    const outwear=page.locator("#tabContainer a:has-text('Ladies Outerwear')");
    await outwear.click();
    await page.waitForTimeout(3000);

    const title=await page.locator(".title").allInnerTexts();
    console.log(title);
    console.log("Number of products found:",title.length);

    expect(title.length).toBe(6);

    await page.waitForTimeout(3000);
})