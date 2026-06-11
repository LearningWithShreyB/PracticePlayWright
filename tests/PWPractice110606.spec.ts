import {test,expect, Locator} from '@playwright/test';

test('Verifying the pagination table for dropdown selction',async({page})=>{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const dropdown=await page.locator('#dt-length-0').selectOption('50');

    const tableRows=await page.locator("#example tbody tr").all();

    const rowsLength=tableRows.length;

    const textBox=await page.locator(".dt-info").innerText();

    expect(textBox).toContain(String(rowsLength));

})