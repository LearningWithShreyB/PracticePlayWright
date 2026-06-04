import {test,expect,Locator} from '@playwright/test';

test('Verifying the Auto suggested dropdown',async({page})=>
{
    await page.goto("https://www.google.com/");

    await page.locator("#APjFqb").fill("playwright");
    await page.waitForTimeout(2000);

    const options:Locator=page.locator('ul[role="listbox"] li');

    const count:number= await options.count();
    console.log("No of suggested options are:",count);

    console.log("Printing all the auto suggestions.....")
    for(let i=0;i<count;i++)
    {
        //console.log(await options.nth(i).innerText());
        console.log(await options.nth(i).innerText());
    }

    for(let i=0;i<count;i++){
        const text=await options.nth(i).innerText();
        if(text==='playwright mcp'){
            options.nth(i).click();
            break;
        }
    }

    await page.waitForTimeout(10000);
});