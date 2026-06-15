import { test, expect } from '@playwright/test';

test('Verifying Frames-Part01', async ({ page }) => {
    // 1. Navigate to the page
    await page.goto("https://ui.vision/demo/webtest/frames/frame_3");
    
    const frames = page.frames();
    console.log("The number of frames are:", frames.length);

    // 2. Interact with the main page input (ADDED AWAIT)
    const text = page.locator("input[name='mytext3']");
    await text.fill("Welcome!!"); 
    await expect(text).toHaveAttribute('type');

    // 3. Find the Google Form iframe using REGEX instead of an exact string
    const googleFrame = page.frame({ url: /.*docs.google.com\/forms.*/ });

    if (googleFrame) {
        console.log("Google Form frame found successfully!");
        
        // Target the radio button option inside the frame
        const radioButton = googleFrame.getByLabel('I am a human', { exact: false });
        
        // Check it
        await radioButton.check();
        
        // Verify it was checked
        await expect(radioButton).toBeChecked();
    } else {
        console.log("No frame is available..");
    }

    await page.waitForTimeout(3000);
});