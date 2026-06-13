import { test, expect, Locator } from '@playwright/test';

test('Verifying the pagination table', async ({ page }) => {
    await page.goto('https://blazedemo.com/');

    const departure: Locator = page.locator("select[name='fromPort']");
    await departure.selectOption({ label: 'Boston' });

    const destination: Locator = page.locator("select[name='toPort']");
    await destination.selectOption({ label: 'London' });

    const findFlightsButton: Locator = page.locator("input[type='submit']");
    await findFlightsButton.click();

    const tableRows: Locator = page.locator(".table tbody tr");

    const count = await tableRows.count();
    console.log("The total number of rows/ flights are:", count);
    expect(count).toBeGreaterThan(0);

    const tableRowsArray: Locator[] = await page.locator(".table tbody tr").all();

    let price;

    for (let row of tableRowsArray) {
        price = await row.locator('td').nth(5).innerText();
        console.log(price);
    }

    await page.waitForTimeout(3000);




})