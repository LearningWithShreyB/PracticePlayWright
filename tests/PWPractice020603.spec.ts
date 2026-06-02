import { test, expect } from '@playwright/test';

test('Verifying duplicate elements of dropdown', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const ddOptions: string[] = (await page.locator("#colors>option").allTextContents()).map(text => text.trim());

    const originalList:string[]=[...ddOptions];
    const sortedList:string[]=[...ddOptions.sort()];

    console.log("Original list:",originalList);
    console.log("Sorted list:",sortedList);

    expect(sortedList).not.toEqual(originalList);
});