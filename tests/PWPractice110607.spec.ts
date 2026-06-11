import { test, expect } from '@playwright/test';

test('Verifying the pagination table', async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    await page.locator("input[type='search']").fill("Tokyo");
    await page.waitForTimeout(3000);

    const tableRows = await page.locator("#example tbody tr").all();
    if (tableRows.length >= 1) {
        let matchFound = false
        for (let row of tableRows) {

            const text = await row.innerText();
            if (text.includes('Tokyo')) {
                console.log("Good Job!!");
                matchFound = true;
                break;
            }

        }
        expect(matchFound).toBe(true);

    }
    else {
        console.log("Try again!!");
    }


});