import { test, expect } from '@playwright/test';

test('Verifying duplicate elements of dropdown', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const ddOptions: string[] = (await page.locator("#colors>option").allTextContents()).map(text => text.trim());

    for(const i of ddOptions)
    {
        console.log(i);
    }
    const mySet = new Set<string>;
    const duplicates: Array<string> = [];

    for (const res of ddOptions) {
        if (mySet.has(res)) {
            duplicates.push(res);
        }
        else {
            mySet.add(res);
        }
    }

    console.log('Elements containing in MySet', mySet);
    console.log('Elements having duplicates', duplicates);

    if(duplicates.length>0)
    {
        console.log("Duplicate options found.", duplicates)
    }
    else{
        console.log("No duplicate options found..")
    }
});