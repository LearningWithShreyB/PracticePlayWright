import { test, expect, Locator } from '@playwright/test';

test('Verifying the Date Picker Part-03', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const datePicker=await page.locator("#datepicker");
    datePicker.click();

    const month = 'April';
    const year = '2025';
    const date = '26';

    while (true) {
        const currentMonth = await page.locator(".ui-datepicker-month").innerText();
        const currentYear = await page.locator(".ui-datepicker-year").innerText();

        if (currentMonth === month && currentYear === year) {
            break;
        }

        await page.locator(".ui-datepicker-prev").click();

    }

    await page.waitForTimeout(2000);

    const allDate = await page.locator(".ui-datepicker-calendar td").all();

        for (let date1 of allDate) {
            const dateText = await date1.innerText();

            if (dateText === date) {
                await date1.click();
                break;
            }
        }

        expect(datePicker).toHaveValue("04/26/2025")

    await page.waitForTimeout(2000);
});