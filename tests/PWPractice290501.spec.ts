import {test, expect, Locator} from '@playwright/test';

test('Verifying the TextBox functionality',async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const textBox:Locator=page.locator('#name');

    console.log("\nPerforming some assertions");
    await expect(textBox).toBeAttached();

    await expect(textBox).toBeVisible();

    await expect(textBox).toBeEnabled();

    await expect(textBox).toBeEditable();

    await expect(textBox).toHaveAttribute('maxlength','15');

    /* await textBox.fill('Playwright');
    await expect(textBox).toHaveValue('Playwright');

    await textBox.fill('Typescript');

    const value=await textBox.inputValue();
    expect(value).toBe('Typescript'); */

    await textBox.fill('Playwright');
    await expect(textBox).toHaveValue('Playwright');

    //await textBox.fill('Typescript');

    const value=await textBox.inputValue();
    expect(value).toBe('Playwright');

    
})