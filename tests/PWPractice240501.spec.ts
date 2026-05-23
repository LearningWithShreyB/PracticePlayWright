import {test, expect, Locator} from "@playwright/test";

test("Verify XPath Locators", async ({page})=>
{
    await page.goto("https://demowebshop.tricentis.com/");

    // 1. Absolute XPath (Full XPath)
    const logo:Locator=page.locator('//body/div[4]/div[1]/div[1]/div[1]/a/img');
    await expect(logo).toBeVisible();

    // 2. Relative XPath (Partial XPath)
    const logo1:Locator=await page.locator("//*[@alt='Tricentis Demo Web Shop']");
    await expect(logo1).toBeVisible();

    // 3. XPath with contains() 
    const tag2: Locator = page.locator('//h2//a[contains(@href, "computer")]');
    await expect(tag2).toHaveCount(4);

     // 4. XPath with starts-with()
    const tag3:Locator=page.locator("//h2//a[starts-with(@href,'/build')]");
    const totalCount:number=await tag3.count();
    expect(totalCount).toBeGreaterThan(0);
    await expect(tag3).toHaveCount(3);

    // 5. XPath with last()

    const tag4:Locator=page.locator("(//h2[@class='product-title']/a)[last()]");
    await expect(tag4).toHaveText('Simple Computer');

    // 6. XPath with text()

    await expect(page.locator("//a[text()='Log in']")).toBeVisible(); 

    // 7. XPath with position()
    const tag5:Locator=page.locator("//div[@class='column follow-us']//li[position()='3']");
    await expect(tag5).toHaveText("RSS");

    const tag6:string=await page.locator("//div[@class='column follow-us']//li[position()='3']").innerText();
    expect(tag6).toBe('RSS');

})