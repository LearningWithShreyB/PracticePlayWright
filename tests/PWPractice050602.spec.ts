import { test, expect, Locator } from '@playwright/test';

test('Verifying auto-suggested dropdown of Amazon', async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator("input[placeholder='Username']").fill('Admin');
    await page.locator("input[placeholder='Password']").fill('admin123');
    await page.locator("button[type='submit']").click();

    await page.getByText('PIM').click();
    await page.waitForTimeout(3000);

    await page.locator("form i").nth(1).click();
    await expect(dropdown1.first()).toBeVisible({ timeout: 3000 });
    const count: number = await dropdown1.count();
    for (let i = 0; i < count; i++) {
        const text = await dropdown1.nth(i).innerText();
        if (text === 'Automation Tester1') {
            dropdown1.nth(i).click();
        }
    }

    await page.waitForTimeout(3000); 

});