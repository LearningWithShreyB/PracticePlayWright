import {test, expect, Locator} from '@playwright/test';

test('Verifying the TextBox functionality',async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const textBox:Locator=page.locator('#name');

    console.log("\nPerforming some assertions");
    await expect(textBox).toBeAttached();

    await expect(textBox).toBeVisible();

    await expect(textBox).toBeEnabled();
})