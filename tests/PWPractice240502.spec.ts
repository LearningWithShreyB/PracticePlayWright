import {test, expect, Locator} from "@playwright/test";

test("Verify XPath Locators", async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    /* //Handle Dynamic Elemnets- By Xpath
    for(let i:number=1;i<=5;i++)
    {
        const button:Locator=page.locator("//button[text()='START' or text()='STOP']");
        await button.click();
        await page.waitForTimeout(3000);
    } */


    //Handle Dynamic Elemnets- By PW Locators

    for(let i:number=1;i<=5;i++)
    {
        const button1:Locator=page.getByRole("button",{name: /START|STOP/ });
        await button1.click();
        await page.waitForTimeout(3000);
    }
    






    

})