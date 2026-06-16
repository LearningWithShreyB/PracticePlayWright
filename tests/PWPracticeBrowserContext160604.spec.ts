import { test, expect, chromium, firefox, webkit, Page } from '@playwright/test';

test('Testing Browser Context', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);

    await page.waitForTimeout(3000);

});

test.only('Testing Browser Context-01', async ({context}) => {

    const page = await context.newPage();

    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);

    await page.waitForTimeout(3000);

});