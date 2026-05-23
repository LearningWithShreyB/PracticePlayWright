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
/*
    // Login link using CSS selector with exact text match

    await expect(page.locator("a[href='/login']")).toBeVisible(); 

    // Getting multiple elements handling
    const tag5:Locator=page.locator("[style='font-size:100%;'][href$='rel']");
    //const tag5:Locator=page.locator("a:not([style='font-size:100%;'])[href$='rel']");
    //const tag5 = page.locator("a[href$='rel']:not([style='font-size:100%;'])");
    //const text:string|null=await tag5.textContent();
    //console.log("Value of element:",text);
    await expect(tag5).toBeVisible();


    const tag6:Locator=page.locator("[style='font-size:100%;']");
    const totalElements:string[]=await tag6.allTextContents();
    
    for(let value of totalElements)
    {
        console.log(value);
    }

    await expect(tag6.first()).toHaveText("apparel");
    await expect(tag6.last()).toHaveText("computer");

        */

})