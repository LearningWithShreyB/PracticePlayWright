import { test, expect, Locator, Page } from '@playwright/test';

async function selectDate(targetMonth: string, targetDate: string, targetYear: string, page: Page,) {

        const monthDropdown = page.locator("select.ui-datepicker-month");
        await monthDropdown.selectOption({label:targetMonth});
        const yearDropdown = page.locator("select.ui-datepicker-year");
        await yearDropdown.selectOption({label:targetYear});

    const allDate = await page.locator(".ui-datepicker-calendar td").all();

    for (let date1 of allDate) {
        const dateText = await date1.innerText();

        if (dateText === targetDate) {
            await date1.click();
            break;
        }
    }
}

test('Verifying the Date Picker Part-05 for Past dates', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const datePicker = page.locator("#txtDate");
    await datePicker.click();

    const month = 'Apr';
    const year = '2025';
    const date = '26';

    await selectDate(month, date, year, page);

    await expect(datePicker).toHaveValue("26/04/2025")

    await page.waitForTimeout(2000);
});

test.only('Verifying the Date Picker Part-05 for Future dates', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const datePicker = page.locator("#datepicker");
    datePicker.click();

    const month = 'May';
    const year = '2027';
    const date = '30';

    await selectDate(month, date, year, page);

    await expect(datePicker).toHaveValue("30/05/2027")

    await page.waitForTimeout(2000);
});