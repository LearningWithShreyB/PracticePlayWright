import {test,expect, Locator} from '@playwright/test';

test('Verifying static table',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table:Locator=page.locator("table[name='BookTable']");
    await expect(table).toBeVisible();

    console.log("Counting the number of rows:");
    const tableRows:Locator=table.locator("tr");
    const count:number=await tableRows.count();
    console.log("The number of rows are:",count);


})