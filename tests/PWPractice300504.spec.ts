import { test, expect, Locator } from '@playwright/test';

test('Verifying the checkbox functionality - Part2', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const days: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes: Array<Locator> = days.map(day => page.getByLabel(day));
    expect(checkboxes.length).toBe(days.length);

    await checkboxes[2].check();
    await expect(checkboxes[2]).toBeChecked();
    await page.waitForTimeout(2000);

    for (const checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        await page.waitForTimeout(1000);
    }

    for (const checkbox of checkboxes.slice(-2)) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
        await page.waitForTimeout(1000);
    }


    for (const checkbox of checkboxes) {
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
            await page.waitForTimeout(1000);
        }
        else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
            await page.waitForTimeout(1000);
        }
    }



});