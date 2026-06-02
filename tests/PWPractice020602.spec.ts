import { test, expect } from '@playwright/test';

test('Verifying duplicate elements of dropdown', async ({ page }) => {

    const ddOptions: string[] = (await page.locator("#colors>option").allTextContents()).map(text => text.trim());

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
});