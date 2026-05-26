import { test, expect } from '@playwright/test'

test('Verifying the GET Method through Path Params', async ({ request }) => {
    const bookingID = 1;

    const getResponse = await request.get(`/booking/${bookingID}`);
    const getResponseBody = await getResponse.json();
    console.log(getResponseBody);
    console.log(getResponse);

    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);
});