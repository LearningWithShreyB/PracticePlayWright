import { test, expect } from '@playwright/test';

test('Verifying Frames-Part01', async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/frame_3");
    const frames = page.frames();
    console.log("The number of frames are:", frames.length);

    const frame3=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'});
    
      if(frame3){
          await frame3.locator("[name='mytext3']").fill("Welcome");
           const childFrames= frame3.childFrames();
           console.log("Child frames inside the Frame 3:", childFrames.length); // only 1 child frame exist
           const radio=childFrames[0].getByLabel("I am a human");
           await radio.check(); // select radio button
            await expect(radio).toBeChecked();// assertion
       }
        else{
            console.log("Frame 3 is not found..")
        }

    /* const text = page.locator("input[name='mytext3']");
    text.fill("Welcome!!");
    expect(text).toHaveAttribute('type');


    /* const radio01=page.getByLabel('I am a human');
    await radio01.check();
    await expect(radio01).toBeChecked(); 

    const frame = page.frame({ url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLScPXRMtYI_KYL8J6fivHUV0hQKB7j1RtqTrBBUtEr8VMmyCqw/formResponse?pli=1&embedded=true" });
    if (frame) {
        const radio01 = frame.getByLabel('I am a human');
        await radio01.check();
        await expect(radio01).toBeChecked();
    }
    else {
        console.log("Frame is not available");
    } */

    await page.waitForTimeout(3000);
});