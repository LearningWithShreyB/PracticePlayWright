import {test,expect,Locator} from '@playwright/test';

test('Verifying the Date Picker Part-06',async ({page})=>{
    await page.goto("https://www.booking.com/");

    await page.locator("button[aria-label='Select dates']").click();
    //await page.getByTestId('searchbox-dates-container').click();

    await page.waitForTimeout(5000);

    const checkInDate='28';
    const checkInMonth='August';
    const checkInYear='2027';

    while(true)
{

}
});