import {test,expect,Locator} from '@playwright/test';

test('Verifying the Date Picker Part-06',async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

   const stText = '2027-04-26'; 
    const edText = '2027-05-30';

    const start = new Date(stText);
    const end = new Date(edText);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const expectedDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const startDate:Locator=page.locator("#start-date");
    await startDate.fill(stText);

    const endDate:Locator=page.locator("#end-date");
    await endDate.fill(edText);

    await page.locator(".submit-btn").click();

    const resultLocator = page.locator("#result");
    await expect(resultLocator).toHaveText(`You selected a range of ${expectedDays} days.`);

    const dateDifference = await resultLocator.innerText();
    console.log(dateDifference);
    

});