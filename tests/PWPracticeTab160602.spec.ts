import { test, expect, chromium, firefox, webkit, Page, Locator} from '@playwright/test';

test('Testing Popups', async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const parentPage = await context.newPage();
    console.log("No of pages created:", context.pages().length);

    await parentPage.goto('https://testautomationpractice.blogspot.com/');
    await expect(parentPage).toHaveTitle(/Automation/);

    await Promise.all([parentPage.waitForEvent('popup'),parentPage.locator("#PopUp").click()]);

    await parentPage.waitForTimeout(3000);
    
    const pages=context.pages();
    console.log("No of pages created:", pages.length);

    console.log("Title of Parent Page:",await pages[0].title());
    console.log("Title of 1st Popup Page:",await pages[1].title());
    console.log("Title of 2nd popup Page:",await pages[2].title());
    console.log("URL of Parent Page:", pages[0].url());
    console.log("URL of 1st Popup Page:", pages[1].url());
    console.log("URL of 2nd popup Page:", pages[2].url());

    const text01:Locator=pages[1].locator("h4:has-Text('Selenium WebDriver')");
    await expect(text01).toBeVisible();
    const text02=pages[2].getByRole('link', { name: 'Get started' })
    await text02.click();
    await expect(text02).toBeEnabled();

    for(const pw of pages){
        const title=await pw.title();
        if(title.includes('Playwright')){
            await pw.close();
        }
        else{
            await pw.close();
        }
    }

});