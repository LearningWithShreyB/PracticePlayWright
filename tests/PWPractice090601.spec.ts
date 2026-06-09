import {test,expect, Locator} from '@playwright/test';

test('Verifying static table',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table:Locator=page.locator("table[name='BookTable']");
    await expect(table).toBeVisible();

    console.log("Counting the number of rows:");
    const tableRows:Locator=table.locator("tr");
    const rowsCount:number=await tableRows.count();
    console.log("The number of rows are:",rowsCount);
    await expect(tableRows).toHaveCount(rowsCount);

    console.log("Counting the number of headers and columns");
    const tableColumns:Locator=table.locator("th");
    const columnCount:number=await tableColumns.count();
    console.log("The number of columns are:",columnCount);
    expect(columnCount).toBe(4);

    console.log("Reading all data from 3rd row excluding headers");
    const thirdRow:Locator=tableRows.nth(3).locator("td")
    const thirdRowData:string[]=await thirdRow.allInnerTexts();
    //console.log(thirdRowData);

    for(let data of thirdRowData)
    {
        console.log(data);
    }

   
    


});