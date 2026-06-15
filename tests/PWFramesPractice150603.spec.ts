import { test, expect } from '@playwright/test';

test('Verifying Frames-Part01', async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/frame_3");
    
    // Parent frame interaction
    const text = page.locator("input[name='mytext3']");
    await text.fill("Welcome!!");

    // 1. Target the Google Form iframe
    const googleFrame = page.frameLocator('iframe[src*="docs.google.com"]');
    
    // 2. Click the dropdown element to open the options panel
    // Google lists this as role="listbox"
    const dropdownBox = googleFrame.locator('div[role="listbox"]').filter({ hasText: 'Choose' });
    await dropdownBox.click();

    // 3. Wait a moment for the animation to complete and look for the option globally inside the frame
    // We target the explicit text box layer inside the list options container
    const choiceYes = googleFrame.locator('div[role="option"] span').getByText('Yes', { exact: true });
    
    // Use force: true to guarantee the click goes through the floating layout layers
    await choiceYes.click({ force: true });

    // 4. Verify that the selection has updated on the screen
    await expect(dropdownBox).toContainText('Yes');

    await page.waitForTimeout(3000);
});