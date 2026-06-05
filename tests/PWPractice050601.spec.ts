import { test, expect, Locator } from '@playwright/test';

test('Verifying auto-suggested dropdown of Amazon', async ({ page }) => {
    await page.goto("https://www.amazon.in/");

    await page.locator("#twotabsearchtextbox").fill('apple');
    await page.waitForTimeout(3000);

    const options: Locator = page.locator("div[role='rowgroup'] div[role='button']");

    const count: number = await options.count();

    for (let i = 0; i < count; i++) {
        console.log(options.nth(i).innerText());
    }

    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).innerText();
        if (text === 'apple 17') {
            options.nth(i).click();
            break;
        }
    }
    await page.waitForTimeout(3000);
});