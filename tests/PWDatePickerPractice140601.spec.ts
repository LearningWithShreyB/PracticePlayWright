import { test, expect, Locator } from '@playwright/test';

test('Verifying the Date Picker Part-01', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator("#datepicker").fill("04/26/2027");

    await page.waitForTimeout(3000);
});