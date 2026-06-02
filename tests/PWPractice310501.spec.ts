import { test, expect } from '@playwright/test';

test('Performing the task of checkbox using switch statement', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const day: string = 'Sunday';

    switch (day) {
        case 'Sunday':
            await page.locator('#sunday').check();
            break;
        case 'Monday':
            await page.locator('#monday').check();
            break;
        case 'Tuesday':
            await page.locator('#tuesday').check();
            break;
        case 'Wednesday':
            await page.locator('#wednesday').check();
            break;
        case 'Thursday':
            await page.locator('#thursday').check();
            break;
        case 'Friday':
            await page.locator('#friday').check();
            break;
        case 'Saturday':
            await page.locator('#saturday').check();
            break;
        default:
            console.log('Day not found!!');

    }
});