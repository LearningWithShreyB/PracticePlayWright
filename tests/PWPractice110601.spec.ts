import { test, expect, Locator } from '@playwright/test';

test('Verifying the Dynamic Table for CPU Load', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table: Locator = page.locator('#taskTable tbody');
    await expect(table).toBeVisible();

    const tableRows: Locator[] = await table.locator("tr").all();
    expect(tableRows).toHaveLength(4);

    let cpuLoad = '';

    for (let row of tableRows) {
        const name: string = await row.locator('td').first().innerText();

        if (name === 'Chrome') {
            cpuLoad = await row.locator("td:has-text('%')").innerText();
            console.log('The CPU Load of chrome is:', cpuLoad);
            break;
        }
    }

    const cpuLoadText: string = await page.locator(".chrome-cpu").innerText();

    if (cpuLoadText === cpuLoad) {
        console.log("Good Job!!");
    }
    else {
        console.log("Try again!!");
    }

    expect(cpuLoadText).toBe(cpuLoad);

});

test.only('Verifying the Dynamic Table for Memory Size',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table: Locator = page.locator('#taskTable tbody');
    await expect(table).toBeVisible();

    const tableRows: Locator[] = await table.locator("tr").all();
    expect(tableRows).toHaveLength(4);

    let memorySize = '';

    for (let row of tableRows) {
        const name: string = await row.locator('td').first().innerText();

        if (name === 'Firefox') {
            memorySize = await row.locator("td:has-text('MB')").innerText();
            console.log('The CPU Load of chrome is:', memorySize);
            break;
        }
    }

    const memorySizeText: string = await page.locator(".memorySize").innerText();

    if (memorySizeText === memorySize) {
        console.log("Good Job!!");
    }
    else {
        console.log("Try again!!");
    }

    expect(memorySizeText).toBe(memorySize);


})