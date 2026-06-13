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

    const prices: string[] = [];
    for (let i = 0; i < count; i++) {
        const price = await tableRows.nth(i).locator('td').nth(5).innerText();
        prices.push(price);
    }

    console.log('Flight Prices:', prices);
    const sortedPrices = [...prices].sort();
    console.log('Sorted Price:', sortedPrices);
    const lowestPrice = sortedPrices[0];
    console.log('Lowest Price:', lowestPrice);
    expect(lowestPrice).toBeDefined();

    for (let i = 0; i < count; i++) {
        const price = await tableRows.nth(i).locator('td').nth(5).innerText();
        if (price === lowestPrice) {
            await tableRows.nth(i).locator("td").locator("input[type='submit']").click();
            break;
        }
    }

    await page.locator("#inputName").fill("John");
    await page.locator("#address").fill("1403 American Beauty Ln");
    await page.locator("#city").fill("Columbus");
    await page.locator("#state").fill("OH");
    await page.locator("#zipCode").fill("43240");
    await page.locator("#creditCardNumber").fill("6789 0673 4523 1267");
    await page.locator("#cardType").selectOption({label:"Diner's Club"});
    await page.locator("#creditCardMonth").fill('04');
    await page.locator("#creditCardYear").fill("2023");
    await page.locator("#nameOnCard").fill("John Canedy");

    await page.waitForTimeout(3000);

    await page.locator("input[value='Purchase Flight']").click();

    const textContent = await page.locator("h1").innerText();

    expect(textContent).toBe("Thank you for your purchase today!");

    await page.waitForTimeout(2000);

})