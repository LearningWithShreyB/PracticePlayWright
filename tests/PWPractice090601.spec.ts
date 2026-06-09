import {test,expect, Locator} from '@playwright/test';

test('Verifying static table',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table:Locator=page.locator("table[name='BookTable']");
    await expect(table).toBeVisible();

    console.log("\nCounting the number of rows:");
    const tableRows:Locator=table.locator("tr");
    const rowsCount:number=await tableRows.count();
    console.log("The number of rows are:",rowsCount);
    await expect(tableRows).toHaveCount(rowsCount);

    console.log("\nCounting the number of headers and columns");
    const tableColumns:Locator=table.locator("th");
    const columnCount:number=await tableColumns.count();
    console.log("The number of columns are:",columnCount);
    expect(columnCount).toBe(4);

    console.log("\nReading all data from 3rd row excluding headers");
    const thirdRow:Locator=tableRows.nth(3).locator("td")
    const thirdRowData:string[]=await thirdRow.allInnerTexts();
    //console.log(thirdRowData);

    for(let data of thirdRowData)
    {
        console.log(data);
    }

   
    console.log("\nRead all data from the table (excluding header)");
    const allRowsData:Locator[]=await tableRows.all();

    const rowData=allRowsData.slice(1);

    for(let data of rowData){
        const dataRows:string[]=await data.locator("td").allInnerTexts();
        console.log(dataRows.join(" | "))
    }

    console.log("\nPrint book names where author is Amit");

    const result:string[]=[];
    for(let data of rowData){
        const authorName=await data.locator("td").nth(1).innerText();
        //console.log(authorName)
        const bookName=await data.locator("td").first().innerText();
        //console.log(bookName)

        if(authorName==='Amit'){
            console.log(`${bookName} | ${authorName}`);
            result.push(bookName);
        }
    }

    expect(result).toHaveLength(2);


});