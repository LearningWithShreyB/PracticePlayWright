import { test, expect, Locator } from '@playwright/test';

test('Verifying auto-suggested dropdown of Amazon', async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator("input[placeholder='Username']").fill('Admin');
    await page.locator("input[placeholder='Password']").fill('admin123');
    await page.locator("button[type='submit']").click();

    await page.getByText('PIM').click();

    const options: Locator = page.locator("div.oxd-select-text-input");
    await page.waitForTimeout(3000);
   // await expect(options.first()).toBeVisible({ timeout: 5000 });
    const count: number = await options.count();
    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).innerText();
        if (text === 'Automation Tester1') {
            options.nth(i).click();
        }
    }

    await page.waitForTimeout(3000);

});