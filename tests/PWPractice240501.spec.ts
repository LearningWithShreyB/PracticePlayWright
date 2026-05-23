import {test, expect, Locator} from "@playwright/test";

test("Verify XPath Locators", async ({page})=>
{
    await page.goto("https://demowebshop.tricentis.com/");

    // 1. Absolute XPath (Full XPath)
    const logo:Locator=page.locator('//body/div[4]/div[1]/div[1]/div[1]/a/img');
    await expect(logo).toBeVisible();
    
})