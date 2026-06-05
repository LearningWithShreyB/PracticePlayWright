import { test, expect, Locator } from '@playwright/test';

test('Verifying auto-suggested dropdown of Amazon', async ({ page }) => {
    await page.goto("https://www.amazon.in/");

    await page.locator("input[placeholder='Username']").fill('Admin');
    await page.locator("input[placeholder='Password']").fill('admin123');
    await page.locator("button[type='submit']").click();

    const options: Locator = page.locator("div[role='rowgroup'] div[role='button']");
    await expect(options.first()).toBeVisible({ timeout: 5000 });

    const count: number = await options.count();

    for (let i = 0; i < count; i++) {
        const optionLocator = options.nth(i);
        const text = await optionLocator.innerText();
        console.log(`Dropdown Option [${i + 1}]: ${text}`);
    }

    for (let i = 0; i < count; i++) {
        const optionLocator = options.nth(i);
        const text = await optionLocator.innerText();
        console.log(`Dropdown Option [${i + 1}]: ${text}`);
        if (text === 'apple 17') {
            await optionLocator.click();
            break;
        }
    }
});