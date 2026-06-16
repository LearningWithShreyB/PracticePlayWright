import { test, expect, chromium, firefox, webkit, Page, Locator} from '@playwright/test';

test('Testing Browser Context', async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const parentPage = await context.newPage();
    console.log("No of pages created:", context.pages().length);

    await parentPage.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(parentPage).toHaveTitle("OrangeHRM");

    const [childPage]=await Promise.all([context.waitForEvent('page'),parentPage.locator("a:has-Text('OrangeHRM, Inc')").click()]);

    
    const pages=context.pages();
    console.log("No of pages created:", context.pages().length);

    const text:Locator=pages[1].locator("[class='nav-link ']");
    await expect(text).toBeVisible();

    console.log("Title of Parent Page:",await pages[0].title());
    console.log("Title of Child Page:",await pages[1].title());

    await expect(pages[0]).toHaveTitle(/Orange/);
    await expect(pages[1]).toHaveTitle(/Software/);


    await parentPage.waitForTimeout(3000);
    await childPage.waitForTimeout(3000);
});