import {test, expect, Locator} from "@playwright/test";

test("Verify XPath Locators", async ({page})=>
{
    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    // 1. self axis - Select <td> element that contains "mexico"
    const tag1:Locator=page.locator("//td[text()='Mexico']/self::td");
    await expect(tag1).toHaveText('Mexico');

    // 2. parent axis - Get parent <tr> of the "Mexico" cell
    const tag11:Locator=await page.locator("//td[text()='Mexico']/parent::tr");
    await expect(tag11).toContainText("Francisco Chang");

    // 3. child axis - Get all <td> children of the third <tr> in the table
    const tag2: Locator = page.locator("//table[@id='customers']//tr[3]/child::td");
    await expect(tag2).toHaveCount(3);

   /*  // 4. XPath with starts-with()
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
 */
})