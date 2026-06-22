import { test, expect } from '@playwright/test';

test('Infinite Scrolling', async ({ page }) => {
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");

    test.slow();

    let previousHeight = 0;

    while (true) {
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        await page.waitForTimeout(2000);

        const currentHeight = await page.evaluate(() => {
            return document.body.scrollHeight;
        });

        console.log("==============================")
        console.log(`Previous height: ${previousHeight}`);
        console.log(`Current height: ${currentHeight}`);

        if (previousHeight === currentHeight) {
            break;
        }

        previousHeight = currentHeight;
    }

    console.log('Reached end of page.');
});