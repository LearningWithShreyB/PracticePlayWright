import { test, expect, Locator } from '@playwright/test';
test('Verifying drop down', async ({ page }) => {
    await page.goto("https://zouk.co.in/");
    await page.locator(".st-Icon").click();
    const dropdown: Locator = page.locator("input[type='text']");
    await dropdown.nth(0).fill("wallet")
    await page.waitForTimeout(3000);

    const options: Locator = page.locator(".st-trending-search-list li");
    const count: number = await options.count();

    console.log("The total count is",count);

    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).innerText();
        if (text === 'Chain Wallet') {
            await options.nth(i).click();
            break;
        }
    }

    await expect(page).toHaveURL(/.*chain-wallet/);

    const heading: Locator = page.locator('.collection-page-title-heading').last();

    await expect(heading).toHaveText('Chain Wallet');

    await expect(heading).toBeVisible();

    console.log("Validation Passed: Redirected to Chain Wallet page successfully");

    await page.waitForTimeout(3000);
})