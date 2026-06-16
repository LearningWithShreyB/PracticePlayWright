import { test, expect, chromium, firefox, webkit, Page, Locator} from '@playwright/test';

test('Testing Popups', async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');
    await expect(page).toHaveTitle(/Internet/);

    const text=page.locator("p:has-Text('Congratulations! You must have the proper credentials.')");
    await expect(text).toBeVisible();

    await Promise.all([context.waitForEvent('page'),page.locator("a:has-Text('Elemental Selenium')").click()]);

    const pages=context.pages();
    console.log("The number of pages:",pages.length);

    const text01=pages[1].locator(".hero__title");
    await expect(text01).toBeVisible();

    await page.waitForTimeout(3000);

});