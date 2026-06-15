import {test,expect} from '@playwright/test';

test('Verifying the Simple Dialog',async({page})=>
{
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog',(dialog)=>{
        console.log("Dialog type is:",dialog.type());
        expect(dialog.type()).toContain('alert');
        console.log("The dialog text is:",dialog.message());
        expect(dialog.message()).toContain("I am an alert box!");
        dialog.accept();
    });


    await page.locator("#alertBtn").click();
    await page.waitForTimeout(3000);
});