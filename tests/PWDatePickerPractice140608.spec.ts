import { test, expect, Locator, Page } from '@playwright/test';

async function selectDate(targetMonth: string, targetDate: string, targetYear: string, page: Page) {

    while (true) {
        const currentMonth = await page.locator(".ui-datepicker-month").innerText();
        const currentYear = await page.locator(".ui-datepicker-year").innerText();

        if (currentMonth === targetMonth && currentYear === targetYear) {
            break;
        }
        else {
            await page.locator(".ui-datepicker-next").click();
        }

    }

    const allDate = await page.locator(".ui-datepicker-calendar td").all();

    for (let date1 of allDate) {
        const dateText = await date1.innerText();

        if (dateText === targetDate) {
            await date1.click();
            break;
        }
    }
}

test('Verifying the Date Picker Part-08', async ({ page }) => {

    await page.waitForTimeout(5000);
    await page.goto('https://www.irctc.co.in/nget/train-search');
    await page.waitForTimeout(5000);

    const datePicker = await page.locator("#jDate span input");
    await datePicker.click();

    const month = 'June';
    const year = '2026';
    const date = '20';

    await selectDate(month, date, year, page);

    await expect(datePicker).toHaveValue("20/06/2026");

    const selectedDate = await datePicker.inputValue();
    expect(selectedDate).toContain(date);

    const expectedDateString = '20/06/2026';
    await expect(datePicker).toHaveValue(expectedDateString);

    await page.waitForTimeout(2000);
});