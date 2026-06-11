import {test,expect} from '@playwright/test';

test('Verifying the pagination table',async({page})=>
{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    /* const tableRows=await page.locator(".display tbody tr").all();
    expect(tableRows).toHaveLength(10); */

    let hasMorePages=true;
    let totalRecords=0

    while(hasMorePages){
        const tableRows=await page.locator(".display tbody tr").all();
        totalRecords+=tableRows.length;
        for(let row of tableRows){
            const cellTexts = await row.locator('td').allInnerTexts();
            console.log(cellTexts.join(' | '));
        }

        const last=page.locator("button[aria-label='Last']");
        const isDisabled=await last.getAttribute('class');

        await page.waitForTimeout(3000);

        if(isDisabled?.includes('disabled')){
            hasMorePages=false;
        }
        else{
            await last.click();
        }
    }
    console.log(`The total number of records are ${totalRecords}`);

});