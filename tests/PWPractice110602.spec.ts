import { test, expect } from '@playwright/test';

test('Verifying the dynamic table for Network Speed of Chrome', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table = page.locator("#taskTable tbody");
    await expect(table).toBeVisible();

    const tableRows = await table.locator('tr').all();
    expect(tableRows).toHaveLength(4);

    let networkSpeed = '';
    for (let row of tableRows) {
        const name = await row.locator('td').first().innerText();
        if (name === 'Chrome') {
            networkSpeed = await row.locator('td', { hasText: 'Mbps' }).innerText();
            break;
        }
    }

    const networkSpeedText: string = await page.locator('.chrome-network').innerText();
    console.log("The Network Speed of chrome is:", networkSpeedText);
    if (networkSpeed === networkSpeedText) {
        console.log("Good Job!!");
    }
    else {
        console.log("Try again!!");
    }

    expect(networkSpeedText).toBe(networkSpeed);

    await page.waitForTimeout(3000);
});