import {test,expect} from '@playwright/test';

test('Verifying the pagination table',async({page})=>
{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    /* const tableRows=await page.locator(".display tbody tr").all();
    expect(tableRows).toHaveLength(10); */

    let hasMorePages=true;

    while(hasMorePages){
        const tableRows=await page.locator(".display tbody tr").all();
        for(let row of tableRows){
            const cellTexts = await row.locator('td').allInnerTexts();
            console.log(cellTexts.join(' | '));
        }

        const next=page.locator("button[aria-label='Next']");
        const isDisabled=await next.getAttribute('class');

        await page.waitForTimeout(3000);

        if(isDisabled?.includes('disabled')){
            hasMorePages=false;
        }
        else{
            await next.click();
        }
    }

});