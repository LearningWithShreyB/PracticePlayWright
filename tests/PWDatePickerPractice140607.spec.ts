import { test, expect, Locator } from '@playwright/test';

async function selectDate(targetMonth: string, targetDate: string, targetYear: string, page: Page,) {

    const monthDropdown = page.locator("select.ui-datepicker-month");
    await monthDropdown.selectOption({ label: targetMonth });
    const yearDropdown = page.locator("select.ui-datepicker-year");
    await yearDropdown.selectOption({ label: targetYear });

    const allDate = await page.locator(".ui-datepicker-calendar td").all();

    for (let date1 of allDate) {
        const dateText = await date1.innerText();

        if (dateText === targetDate) {
            await date1.click();
            break;
        }
    }
}


test('Verifying the Date Picker Part-06', async ({ page }) => {
    await page.goto("https://www.dummyticket.com/dummy-ticket-for-visa-application/");

    await expect(page).toHaveTitle(/Dummy ticket/);

    const radio01 = page.locator("#product_549");
    await radio01.check();
    await expect(radio01).toBeChecked();

    await page.locator("#travname").fill("Akash");
    await page.locator("#travlastname").fill("Rathod");

    const datePicker = page.locator("#dob");
    await datePicker.click();

    const month = 'Apr';
    const year = '1999';
    const date = '26';

    await selectDate(month, date, year, page);

    await expect(datePicker).toHaveValue("26/04/1999");

    const radio02 = page.locator("#sex_1");
    await radio02.check();
    await expect(radio01).toBeChecked();

    await page.waitForTimeout(3000);


});