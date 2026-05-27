import { test, expect } from "@playwright/test";
// 1. Correct syntax for importing JSON in modern Node.js/Playwright
import sourceRequestBody from "../../testdata/post_request_body.json" with { type: "json" };

test("POST Request Using JSON File", async ({ request }) => {

    // 2. Deep clone the data so this test gets a fresh copy 
    // and doesn't pollute other tests if you mutate it later.
    const requestBody = structuredClone(sourceRequestBody);

    // Sending Post Request
    const response = await request.post("/booking", { data: requestBody });
    const responseBody = await response.json();
    console.log(responseBody);

    // Assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    
    // Note: Playwright's toHaveProperty handles dot notation for nested fields automatically
    expect(responseBody).toHaveProperty("booking.firstname");

    const booking = responseBody.booking;

    expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds
    });

    // Validate booking dates (nested json object)
    expect(booking.bookingdates).toMatchObject({
        checkin: requestBody.bookingdates.checkin,
        checkout: requestBody.bookingdates.checkout,
    });
});