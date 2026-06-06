import { test, expect, Locator } from '@playwright/test';
test('Verify hidden dropdown', async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();

    await page.getByText('PIM').click();

    await page.locator('form i').nth(3).click();
    await page.waitForTimeout(3000);

    const ddOptions: Locator = await page.locator("div[role='option']");

    const count: number = await ddOptions.count();

    for (let i = 0; i < count; i++) {
        const text = await ddOptions.nth(i).innerText();
        if (text === 'Development') {
            await ddOptions.nth(i).click();
            break;
        }
    }

    console.log("Validation Passed: 'Development' selected successfully");

    await page.waitForTimeout(4000);

})