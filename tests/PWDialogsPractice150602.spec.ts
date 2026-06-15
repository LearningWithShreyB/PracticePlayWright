import {test,expect} from '@playwright/test';

test('Verifying the Confirmation Dialog for accepting',async({page})=>
{
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog',(dialog)=>{
        console.log("Dialog type is:",dialog.type());
        expect(dialog.type()).toContain('confirm');
        console.log("The dialog text is:",dialog.message());
        expect(dialog.message()).toContain("Press a button!");
        dialog.accept();
    });


    await page.locator("#confirmBtn").click();
    const text=await page.locator("#demo").innerText();
    console.log("The text is:",text);
    expect(page.locator("#demo")).toHaveText("You pressed OK!");

    await page.waitForTimeout(3000);
});