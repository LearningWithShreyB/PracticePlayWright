import {test,expect,chromium} from '@playwright/test';

test('Browser settings',async()=>{
    const browser=await chromium.launch({headless:false});
    const context=await browser.newContext(
        {
            viewport:
            {
                width:1200,
                height:600
            },
            locale:'en-US',
            ignoreHTTPSErrors:true
        }
    );

    const page=await context.newPage();
    await page.setViewportSize(
        {
            width:1250,
            height:1080
        }
    );

    await page.goto("https://www.google.com/");
    console.log("The title of the page",page.title());
    await page.waitForTimeout(5000);
})