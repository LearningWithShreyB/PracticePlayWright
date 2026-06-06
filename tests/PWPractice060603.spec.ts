import { test, expect, Locator } from '@playwright/test';

test('Verify dropdown selection on OrangeHRM PIM page', async ({ page }) => {

    // Navigate to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Login
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Validate successful login
    await expect(page).toHaveURL(/dashboard/);

    // Navigate to PIM module
    await page.getByRole('link', { name: 'PIM' }).click();

    // Open Job Title dropdown
    const dropdown: Locator = page.locator('.oxd-select-text').nth(2);

    await page.waitForTimeout(3000);

    await expect(dropdown).toBeVisible();
    await dropdown.click();

    // Locate all dropdown options
    const dropdownOptions: Locator = page.locator("div[role='option']");

    // Wait until options are visible
    await expect(dropdownOptions.first()).toBeVisible();

    // Print all dropdown options
    const count: number = await dropdownOptions.count();
    console.log(`Total Options Found: ${count}`);

    for (let i = 0; i < count; i++) {

        const optionText: string = await dropdownOptions.nth(i).innerText();

        console.log(`Option ${i + 1}: ${optionText}`);
    }

    // Select desired option
    const targetOption: Locator = page.locator("div[role='option']", {
        hasText: 'Automation Tester'
    });

    await expect(targetOption).toBeVisible();
    await targetOption.click();

    // Validation 1: Selected value should appear in dropdown
    await expect(dropdown).toContainText('Automation Tester');

    // Validation 2: Dropdown options should disappear after selection
    await expect(dropdownOptions.first()).toBeHidden();

    console.log("Validation Passed: 'Automation Tester' selected successfully");

    await page.waitForTimeout(4000);
});