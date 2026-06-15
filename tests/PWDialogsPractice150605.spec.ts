import {test,expect} from '@playwright/test';

test('Verifying the Prompt Dialog for Default Value',async({page})=>
{
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog',(dialog)=>{
        console.log("Dialog type is:",dialog.type());
        expect(dialog.type()).toContain('prompt');
        console.log("The dialog text is:",dialog.message());
        expect(dialog.message()).toContain("Please enter your name:");
        console.log("The default value of dialog box is",dialog.defaultValue());
        expect(dialog.defaultValue()).toBe("Harry Potter");
        dialog.dismiss();
    });


    await page.locator("#promptBtn").click();
    const text=await page.locator("#demo").innerText();
    console.log("The text is:",text);
    expect(page.locator("#demo")).toHaveText("User cancelled the prompt.");

    await page.waitForTimeout(3000);
});