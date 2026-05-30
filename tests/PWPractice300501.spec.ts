import { test, expect, Locator } from '@playwright/test';

test('Verifying the Radio Button functionality', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const radioButton1: Locator = page.locator('#male');
    const radioButton2: Locator = page.locator('#female');

    console.log("\nPerforming some assertions");
    await expect(radioButton1).toBeAttached();

    await expect(radioButton2).toBeVisible();

    await expect(radioButton1).toBeEnabled();
    await expect(radioButton1).not.toBeDisabled();

    await expect(radioButton2).toBeEditable();

    await expect(radioButton1).not.toBeHidden();

    await expect(radioButton1).not.toBeChecked();

    await radioButton1.check();
    await expect(radioButton1).toBeChecked();
    await expect(radioButton2).not.toBeChecked();

    expect(await radioButton1.isChecked()).toBe(true);
    expect(await radioButton2.isChecked()).toBe(false);

    await radioButton2.check();
    await expect(radioButton1).not.toBeChecked();
    await expect(radioButton2).toBeChecked();

    expect(await radioButton1.isChecked()).toBe(false);
    expect(await radioButton2.isChecked()).toBe(true);

    await page.waitForTimeout(3000);

});