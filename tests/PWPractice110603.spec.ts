import { test, expect } from '@playwright/test';

test('Verifying the dynamic table for Network Speed of Chrome', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table = page.locator("#taskTable tbody");
    await expect(table).toBeVisible();

    const tableRows = await table.locator('tr').all();
    expect(tableRows).toHaveLength(4);

    let disk = '';
    for (let row of tableRows) {
        const name = await row.locator('td').first().innerText();
        if (name === 'Firefox') {
            disk = await row.locator('td', { hasText: 'MB/s' }).innerText();
            break;
        }
    }

    const diskSpaceText: string = await page.locator('.firefox-disk').innerText();
    console.log("The Disk Space of firefox is:", disk);
    if (disk === diskSpaceText) {
        console.log("Good Job!!");
    }
    else {
        console.log("Try again!!");
    }

    expect(diskSpaceText).toBe(disk);

    await page.waitForTimeout(3000);
});