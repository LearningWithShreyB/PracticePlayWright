import {test, expect, Locator} from '@playwright/test';

test('Verifying the Radio Button functionality',async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const radioButton1:Locator=page.locator('#male');

    console.log("\nPerforming some assertions");
    await expect(radioButton1).toBeAttached();

    await expect(radioButton1).toBeVisible();

    await expect(radioButton1).toBeEnabled();
    await expect(radioButton1).not.toBeDisabled();

    await expect(radioButton1).toBeEditable();

    await expect(radioButton1).not.toBeHidden();

    await expect(radioButton1).not.toBeChecked();

    
});