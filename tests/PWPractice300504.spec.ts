import { test, expect, Locator } from '@playwright/test';

test('Verifying the checkbox functionality - Part2', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const days:Array<string>=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes:Array<Locator>=days.map(day=>page.getByLabel(day));

    await checkboxes[2].check();
    await expect(checkboxes[2]).toBeChecked();
    await page.waitForTimeout(2000);

    

});