import { test, expect } from '@playwright/test';

test('Handling Cookies', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    test.slow();

    await context.addCookies([{
        name: 'My Cookie1',
        value: '123456',
        url: 'http://www.automationpractice.pl/index.php'
    },
    {
        name: 'My Cookie2',
        value: '123456789',
        url: 'http://www.automationpractice.pl/index.php'
    }]);

    console.log('Cookie added!!');

    await page.goto('http://www.automationpractice.pl/index.php');

    const allCookiesAfterAdd = await context.cookies();
    const retrievedCookies = allCookiesAfterAdd.find((c) => c.name === 'My Cookie');

    console.log('Retrieved cookie details:', retrievedCookies);
    expect(retrievedCookies).toBeDefined();
    expect(retrievedCookies?.value).toBe('123456');

    let allCookies = await context.cookies();
    console.log('Total number of cookies created:', allCookies.length);
    expect(allCookies.length).toBeGreaterThan(0);

    console.log('Printing all the cookies...');
    for (const cookie of allCookies) {
        console.log(`${cookie.name} : ${cookie.value}`);
    }

    await context.clearCookies();
    allCookies = await context.cookies();
    console.log('Number of cookies after deletion:', allCookies.length);
    expect(allCookies.length).toBe(0);
});