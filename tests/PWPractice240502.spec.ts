import {test, expect, Locator} from "@playwright/test";

test("Verify XPath Locators", async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Handle Dynamic Elemnets
    for(let i:number=1;i<=5;i++)
    {
        const button:Locator=page.locator("//button[text()='START' or text()='STOP']");
        await button.click();
        await page.waitForTimeout(3000);
    }



    

})