import { test, expect, chromium, firefox, webkit, Page } from '@playwright/test';

test('Testing Browser Context', async () => {

    const browser = await webkit.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
    await page.waitForTimeout(3000);

});