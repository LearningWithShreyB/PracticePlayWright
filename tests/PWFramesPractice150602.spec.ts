import { test, expect } from '@playwright/test';

test('Verifying Frames-Part01', async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/frame_3");
    const frames = page.frames();
    console.log("The number of frames are:", frames.length);

    const text = page.locator("input[name='mytext3']");
    text.fill("Welcome!!");
    expect(text).toHaveAttribute('type');

    const googleFrame = page.frameLocator('iframe[src*="docs.google.com"]');
    const checkBox = googleFrame.getByLabel('Web testing');

    await checkBox.click();
    await expect(checkBox).toBeChecked();

    await page.waitForTimeout(3000);
});