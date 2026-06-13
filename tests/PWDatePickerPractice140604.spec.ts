import { da } from '@faker-js/faker';
import { test, expect, Locator, Page } from '@playwright/test';

async function selectDate(targetMonth: string, targetDate: string, targetYear: string, page: Page, isFuture: boolean) {

    while (true) {
        const currentMonth = await page.locator(".ui-datepicker-month").innerText();
        const currentYear = await page.locator(".ui-datepicker-year").innerText();

        if (currentMonth === targetMonth && currentYear === targetYear) {
            break;
        }

        if (isFuture) {
            await page.locator(".ui-datepicker-next").click();
        }
        else {
            await page.locator(".ui-datepicker-prev").click();
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

test('Verifying the Date Picker Part-04 for Past dates', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const datePicker = await page.locator("#datepicker");
    datePicker.click();

    const month = 'April';
    const year = '2025';
    const date = '26';

    await selectDate(month, date, year, page, false);

    await expect(datePicker).toHaveValue("04/26/2025")

    await page.waitForTimeout(2000);
});

test('Verifying the Date Picker Part-04 for Future dates', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const datePicker = await page.locator("#datepicker");
    datePicker.click();

    const month = 'April';
    const year = '2027';
    const date = '26';

    await selectDate(month, date, year, page, true);

    await expect(datePicker).toHaveValue("04/26/2027")

    await page.waitForTimeout(2000);
});