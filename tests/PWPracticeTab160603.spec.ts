import { test, expect, chromium, firefox, webkit, Page, Locator} from '@playwright/test';

test('Testing Popups', async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext({httpCredentials:{username:'admin',password:'admin'}});
    const page = await context.newPage();

    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    await expect(page).toHaveTitle(/Internet/);
    
    const text=page.locator("p:has-Text('Congratulations! You must have the proper credentials.')");
    await expect(text).toBeVisible();

});