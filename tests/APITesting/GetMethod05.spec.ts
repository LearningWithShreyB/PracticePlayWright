import { test, expect } from '@playwright/test';

test('Verifying the GET Method through Query Params', async ({ request }) => {
    const firstname = "Jim";
    const lastname = "Brown";

    const getResponse = await request.get('/booking',
        {
            params:
            {
                firstname,
                lastname
            }
        }
    );

    const getResponseBody = await getResponse.json();
    console.log(getResponseBody);

    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);

    expect(getResponseBody.length).toBeGreaterThan(0);

    for (const item of getResponseBody) {
        expect(item).toHaveProperty("bookingid");
        expect(typeof item.bookingid).toBe("number");
        expect(item.bookingid).toBeGreaterThan(0);
    }

}
);