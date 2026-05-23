import { test, expect, Locator } from "@playwright/test";

test("Verify CSS Locators", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");

    /* // logo
    const tag1: Locator = page.locator("img[alt='Tricentis Demo Web Shop']");
    await expect(tag1).toBeVisible();

    // Products containing "computer" in href attribute
    const tag2: Locator = page.locator("h2>a[href*='computer']");
    console.log("Names of computer related products: ", await tag2.allTextContents());
    console.log("First value: ", await tag2.first().textContent());
    console.log("Second value: ", await tag2.nth(1).textContent());
    console.log("Third value: ", await tag2.nth(2).textContent());
    console.log("Fourth value: ", await tag2.last().textContent());
    console.log("Total Number of computer related products: ", await tag2.count());
    await expect(tag2).toHaveCount(4);

    let totalProducts:Array<string> = await tag2.allTextContents();

    for(let value of totalProducts)
    {
        console.log(value);
    }

    // Products starting with "/build" in href attribute
    const tag3:Locator=page.locator("h2>a[href^='/build']");
    const totalCount:number=await tag3.count();
    expect(totalCount).toBeGreaterThan(0);
    await expect(tag3).toHaveCount(3);

    // Products ending with "/build" in href attribute
    const tag4:Locator=page.locator("h2>a[href$='op']");
    await expect(tag4).toHaveText('14.1-inch Laptop');


    // Login link using CSS selector with exact text match

    await expect(page.locator("a[href='/login']")).toBeVisible(); */

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



 

})