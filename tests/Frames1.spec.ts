import { test, expect } from '@playwright/test';

test('Verifying Frames using frameLocator', async ({ page }) => {
    // 1. Navigate directly to frame_3 page
    await page.goto("https://ui.vision/demo/webtest/frames/frame_3");

    // 2. Interact with the main page input (Don't forget the await!)
    const text = page.locator("input[name='mytext3']");
    await text.fill("Welcome!!");
    await expect(text).toHaveAttribute('type');

    // 3. Define the frame locator using the <iframe> tag attributes
    // We target the iframe whose 'src' attribute contains 'docs.google.com'
    const googleFormFrame = page.frameLocator('iframe[src*="docs.google.com"]');

    // 4. Locate and interact with the radio button inside that frame
    const radioButton = googleFormFrame.getByLabel('I am a human');
    
    // Playwright will auto-wait for both the frame and the radio button here
    await radioButton.check();

    // 5. Assert it is checked
    await expect(radioButton).toBeChecked();

    await page.waitForTimeout(3000);
});