import { test, expect, Locator } from '@playwright/test';

test('Verifying the checkbox functionality', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const checkBox1: Locator = page.locator('#sunday');
    const checkBox2: Locator = page.locator('#monday');

    console.log("\nPerforming some assertions");
    await expect(checkBox1).toBeAttached();

    await expect(checkBox1).toBeVisible();

    await expect(checkBox1).toBeEnabled();
    await expect(checkBox1).not.toBeDisabled();

    await expect(checkBox1).toBeEditable();

    await expect(checkBox1).not.toBeHidden();

    await expect(checkBox1).not.toBeChecked();

    await checkBox1.check();
    await expect(checkBox1).toBeChecked();
    await expect(checkBox2).not.toBeChecked();

    expect(await checkBox1.isChecked()).toBe(true);
    expect(await checkBox2.isChecked()).toBe(false);

    await checkBox1.uncheck();
    await expect(checkBox1).not.toBeChecked();
    await checkBox2.check();
    await expect(checkBox2).toBeChecked();

    expect(await checkBox1.isChecked()).toBe(false);
    expect(await checkBox2.isChecked()).toBe(true);

    await page.waitForTimeout(3000);

});