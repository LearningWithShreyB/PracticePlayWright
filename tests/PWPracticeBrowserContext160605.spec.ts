import { test, expect, chromium, firefox, webkit, Page } from '@playwright/test';

test('Testing Browser Context', async ({browser}) => {

    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    console.log("No of pages created:",context.pages().length);

    await page1.goto('https://playwright.dev/');
    await expect(page1).toHaveTitle(/Playwright/);

    await page1.waitForTimeout(3000);

    await page2.goto('https://www.selenium.dev/');
    await expect(page2).toHaveTitle(/Selenium/);

    await page2.waitForTimeout(3000);
});