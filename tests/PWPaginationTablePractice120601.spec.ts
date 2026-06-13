import { test, expect } from '@playwright/test';

test('Verifying the pagination table', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    let currentPageIndex = 1;
    let totalRecords = 0;

    const pages = await page.locator('ul#pagination li').all();
    console.log("Number of Pages: ", pages.length);

    for (let i = 0; i < pages.length; i++) {
        console.log(`--- Processing Page ${currentPageIndex} ---`);

        await pages[i].click();

        const tableRows = await page.locator("#productTable tbody tr").all();
        totalRecords += tableRows.length;

        for (let row of tableRows) {
            const rowText = await row.locator('td').allInnerTexts();
            console.log(rowText.join(' | '));
        }


        for (let i = 0; i < tableRows.length; i++) {
            await tableRows[i].locator('td').nth(3).locator('input').click();
        }

        console.log(`--- all dropdowns of page ${currentPageIndex} are clicked ---`);

        await page.waitForTimeout(3000);


        currentPageIndex++;


    }


})