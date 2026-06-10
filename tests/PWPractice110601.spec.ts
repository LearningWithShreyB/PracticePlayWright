import {test,expect, Locator} from '@playwright/test';

test('Verifying the Dynamic Table', async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table:Locator=page.locator('#taskTable tbody');
    await expect(table).toBeVisible();

    const tableRows:Locator[]=await table.locator("tr").all();
    expect(tableRows).toHaveLength(4);

    

})