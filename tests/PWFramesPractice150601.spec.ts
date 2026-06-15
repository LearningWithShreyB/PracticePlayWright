import { test, expect } from '@playwright/test';

test('Verifying Frames-Part01', async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/frame_3");
    const frames = page.frames();
    console.log("The number of frames are:", frames.length);

    const text = page.locator("input[name='mytext3']");
    text.fill("Welcome!!");
    expect(text).toHaveAttribute('type');

    const frame = page.frame({ url: /.*docs.google.com\/forms.*/ })

    if (frame) {
        console.log("Google Form frame found successfully!");
        await frame.getByLabel('I am a human').check();
        await expect(frame.getByLabel('I am a human')).toBeChecked();
    }
    else {
        console.log("No frame is available..");
    }

    await page.waitForTimeout(3000);
});