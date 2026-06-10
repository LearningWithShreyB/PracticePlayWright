import { test, expect, Locator } from "@playwright/test";

test('Verifying the Dynamic Table', async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const table: Locator = page.locator(".table tbody");
    await expect(table).toBeVisible();

    const tableRows: Locator[] = await table.locator('tr').all();
    console.log("The number of rows:", tableRows.length);
    expect(tableRows).toHaveLength(4);

    let cpuLoad;
    for (let row of tableRows) {
        const name: string = await row.locator("td").first().innerText();
        if (name === 'Chrome') {
            cpuLoad = await row.locator("td", { hasText: '%' }).innerText();
            console.log("The value of CPU Load is:", cpuLoad);
            break;
        }
    }

});