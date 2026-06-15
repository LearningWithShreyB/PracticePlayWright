import { test, expect, Page } from '@playwright/test';

async function selectDate(targetMonth: string, targetDate: string, targetYear: string, page:Page) {

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
    await page.locator("#travlastname").fill("Rathore");

    const datePicker = page.locator("#dob");
    await datePicker.click();

    const month = 'Apr';
    const year = '1999';
    const date = '26';

    await selectDate(month, date, year, page);

    await expect(datePicker).toHaveValue("26/04/1999");

    const radio02 = page.locator("#sex_1");
    await radio02.check();
    await expect(radio02).toBeChecked();

    const radio03 = page.locator("#traveltype_1");
    await radio03.check();
    await expect(radio03).toBeChecked();

    await page.locator("#fromcity").fill("Toronto");

    await page.locator("#tocity").fill("Mumbai");

    const datePicker01 = page.locator("#departon");
    await datePicker01.click();

    const month01 = 'Nov';
    const year01 = '2026';
    const date01 = '26';

    await selectDate(month01, date01, year01, page);

    await expect(datePicker01).toHaveValue("26/11/2026");

    await page.locator("#notes").fill("Need visa as soon as possible");

    await page.locator("#select2-reasondummy-container").click();
    await page.locator(".select2-results__option:nth-child(1)").click();

    const datePicker02 = page.locator("#appoinmentdate");
    await datePicker02.click();

    const month02 = 'Dec';
    const year02 = '2026';
    const date02 = '10';

    await selectDate(month02, date02, year02, page);

    await expect(datePicker02).toHaveValue("10/12/2026");

    const radio04 = page.locator("#deliverymethod_1");
    await radio04.check();
    await expect(radio04).toBeChecked();

    await page.locator("#billname").fill("Akash Rathore");
    await page.locator("#billing_email").fill("abc.123@gmail.com");
    await page.locator("#select2-billing_country-container").click();
    await page.locator('.select2-results li:has-text("Canada")').click();
    await page.locator('[name="billing_phone"]').fill('+12345678956');
    await page.locator('#billing_address_1').fill('123 Scott Street');
    await page.locator('[name="billing_city"]').fill('Niagara Falls');

    await page.locator('#select2-billing_state-container').click();
    await page.locator('.select2-results li:has-text("Ontario")').click();

    await page.locator('#billing_postcode').fill('L2C 6M1');

    await expect(page.locator('#billname')).toHaveValue('Akash Rathore');
    await expect(page.locator('[name="billing_phone"]')).toHaveValue('+12345678956');
    await expect(page.locator('#billing_email')).toHaveValue('abc.123@gmail.com');
    await expect(page.locator('#select2-billing_country-container')).toHaveText('Canada');
    await expect(page.locator('#billing_address_1')).toHaveValue('123 Scott Street');
    await expect(page.locator('[name="billing_city"]')).toHaveValue('Niagara Falls');
    await expect(page.locator('#select2-billing_state-container')).toHaveText('Ontario');
    await expect(page.locator('#billing_postcode')).toHaveValue('L2C 6M1');

    const productName = page.locator('.product-details');
    await expect(productName).toHaveText("Dummy ticket for Visa Application");

    const productPrice = page.locator('.shop_table.woocommerce-checkout-review-order-table tfoot tr:nth-child(2) td');
    await expect(productPrice).toHaveText("₹1,200");

    await page.locator("#place_order").click();

    await page.waitForTimeout(3000);


});