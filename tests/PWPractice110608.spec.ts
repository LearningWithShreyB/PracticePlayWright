import { test, expect } from '@playwright/test';

test('Verifying search results across pagination', async ({ page }) => {
    const searchTerm = '4';

    // 1. Navigate to the page
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    // 2. Perform the Search
    const searchInput = page.locator("input[type='search']");
    await searchInput.fill(searchTerm);

    // Tip: Instead of a hardcoded timeout, wait for the table to update/settle
    // DataTables updates the info text at the bottom (e.g., "Showing 1 to 4 of 4 entries (filtered...)")
    await expect(page.locator('.dt-info')).toContainText('filtered');

    let hasMorePages = true;
    let matchFound = false;
    let currentPageIndex = 1;
    let totalRecords = 0;

    // 3. Loop through filtered pages
    while (hasMorePages) {

        console.log(`--- Processing Page ${currentPageIndex} ---`);
        // Locate all rows currently visible on this page
        const tableRows = await page.locator("#example tbody tr").all();
        totalRecords+=tableRows.length;

        console.log("Found matching row:")
        for (let row of tableRows) {
            const text = await row.locator('td').allInnerTexts();
            if (text.join(' ').includes(searchTerm)) {
                console.log(text.join(' | '));
                matchFound = true;
            }
        }

        // 4. Handle Pagination for Next Page
        // In newer DataTables, buttons use 'dt-paging-button' classes. 
        // We look for the "Next" button explicitly.
        const nextButton = page.locator("button[aria-label='Next']");

        // Check if the next button exists and is enabled
        if (await nextButton.isVisible()) {
            const next = page.locator("button[aria-label='Next']");
            const isDisabled = await next.getAttribute('class');

            await page.waitForTimeout(3000);

            if (isDisabled?.includes('disabled')) {
                hasMorePages = false;
            }
            else {
                currentPageIndex++;
                await next.click();
            }
        } else {
            // No next button found at all (only 1 page of results exists)
            hasMorePages = false;
        }
    }

    // 5. Assert that we found at least one match
    expect(matchFound).toBe(true);

    console.log(`The total number of records are ${totalRecords}`);

    const label = await page.locator("div[aria-live='polite']").innerText();

    expect(label).toContain(String(totalRecords));
});