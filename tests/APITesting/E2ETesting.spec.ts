import { test, expect } from '@playwright/test';
import tokenSourceRequestBody from '../../testdata/token_request_body.json';
import postSourceRequestBody from '../../testdata/post_request_body.json';
import putSourceRequestBody from '../../testdata/put_request_body.json';
import patchSourceRequestBody from '../../testdata/patch_request_body.json';

test('Verifying E2E testing of CRUD operations', async ({ request }) => {
    console.log('\nGenerating the Token');

    const tokenRequestBody = structuredClone(tokenSourceRequestBody);
    const tokenStartTime = Date.now();

    const tokenResponse = await request.post('/auth',
        {
            data: tokenRequestBody,
            headers:
            {
                "Content-Type": "application/json"
            }
        }
    );

    const tokenEndTime = Date.now();

    console.log('\nThe logging of Token-POST request is:');
    console.log(tokenResponse);

    const tokenResponseBody = await tokenResponse.json();
    console.log('\nThe response of POST request is:');
    console.log(tokenResponseBody);

    console.log("\nPerforming some assertions:");
    //expect(tokenResponse.ok()).toBeTruthy();
    expect(tokenResponse.status()).toBe(200);
    expect(tokenResponse.statusText()).toBe('OK');

    const tokenHeaders = tokenResponse.headers();
    expect(tokenHeaders['content-type']).toContain("application/json; charset=utf-8");

    const tokenResponseTime = tokenEndTime - tokenStartTime;
    console.log("\nResponse Time ===>", tokenResponseTime);
    expect(tokenResponseTime).toBeLessThan(5000);

    expect(tokenResponseBody).toHaveProperty('token');
    console.log('\nAll assertions successfully done.');

    const tokenResult = tokenResponseBody.token;
    console.log(`\nToken ===> ${tokenResult}`);

    console.log('\nToken successfully generated');

    //------------------------------------------------------------

    console.log('\nPOST request initiated');

    const postRequestBody = structuredClone(postSourceRequestBody);

    const postStartTime = Date.now();

    const postResponse = await request.post('/booking',
        {
            data: postRequestBody,
            headers:
            {
                "Content-Type": "application/json"
            }
        }
    );

    const postEndTime = Date.now();

    console.log('\nThe logging of POST request is:');
    console.log(postResponse);

    const postResponseBody = await postResponse.json();
    console.log('\nThe response of POST request is:');
    console.log(postResponseBody);

    console.log("Performing some assertions:");
    expect(postResponse.statusText()).toBe('OK');
    expect(postResponse.status()).toBe(200);

    const postHeaders = postResponse.headers();
    expect(postHeaders['content-type']).toContain("application/json; charset=utf-8");

    const postResponseTime = postEndTime - postStartTime;
    console.log("\nResponse Time ===>", postResponseTime);
    expect(postResponseTime).toBeLessThan(5000);

    expect(postResponseBody).toHaveProperty("bookingid");

    const booking = postResponseBody.booking;
    expect(booking).toMatchObject(
        {
            firstname: postRequestBody.firstname,
            lastname: postRequestBody.lastname,
            totalprice: postRequestBody.totalprice,
            depositpaid: postRequestBody.depositpaid,
            additionalneeds: postRequestBody.additionalneeds
        }
    );
    expect(booking.bookingdates).toMatchObject({
        checkin: postRequestBody.bookingdates.checkin,
        checkout: postRequestBody.bookingdates.checkout,
    });
    console.log('All assertions successfully done.');

    const bookingID = postResponseBody.bookingid;
    console.log(`Booking ID ===> ${bookingID}`);

    console.log('\nPOST request successfully done');

    //------------------------------------------------------------

    console.log("\nGET request initiated for Post Method");

    const getStartTime1 = Date.now();

    const getResponse1 = await request.get(`/booking/${bookingID}`);

    const getEndTime1 = Date.now();

    console.log('\nThe logging of first GET request is:');
    console.log(getResponse1);

    const getResponseBody1 = await getResponse1.json();

    console.log('\nThe response of first GET request is:');
    console.log(getResponseBody1);

    console.log("\nPerforming some assertions");
    expect(getResponse1.statusText()).toBe('OK');
    expect(getResponse1.status()).toBe(200);

    const getHeaders1 = getResponse1.headers();
    expect(getHeaders1['content-type']).toContain("application/json; charset=utf-8");

    const getResponseTime1 = getEndTime1 - getStartTime1;
    console.log("\nResponse Time ===>", getResponseTime1);
    expect(getResponseTime1).toBeLessThan(5000);

    expect(getResponseBody1.firstname).toBe(postResponseBody.booking.firstname);

    expect(getResponseBody1).toMatchObject(
        {
            firstname: postRequestBody.firstname,
            lastname: postRequestBody.lastname,
            totalprice: postRequestBody.totalprice,
            depositpaid: postRequestBody.depositpaid,
            additionalneeds: postRequestBody.additionalneeds
        }
    );

    expect(getResponseBody1.bookingdates).toMatchObject(
        {
            checkin: postRequestBody.bookingdates.checkin,
            checkout: postRequestBody.bookingdates.checkout
        }
    )
    console.log('\nAll assertions successfully done.');

    console.log('\nGET request successfully done');

    //------------------------------------------------------------

    console.log('\nPUT request initiated');

    const putRequestBody = structuredClone(putSourceRequestBody);

    const putStartTime = Date.now();

    const putResponse = await request.put(`/booking/${bookingID}`,
        {
            data: putRequestBody,
            headers:
            {
                "Content-Type": "application/json",
                "Cookie": `token=${tokenResult}`
            }
        }
    );

    const putEndTime = Date.now();

    console.log('\nThe logging of PUT request is:');
    console.log(putResponse);

    const putResponseBody = await putResponse.json();
    console.log('\nThe response of PUT request is:');
    console.log(putResponseBody);

    console.log("Performing some assertions:");
    expect(putResponse.statusText()).toBe('OK');
    expect(putResponse.status()).toBe(200);

    const putHeaders = putResponse.headers();
    expect(putHeaders['content-type']).toContain("application/json; charset=utf-8");

    const putResponseTime = putEndTime - putStartTime;
    console.log("\nResponse Time ===>", putResponseTime);
    expect(putResponseTime).toBeLessThan(5000);

    expect(putResponseBody).toMatchObject(
        {
            firstname: putRequestBody.firstname,
            lastname: putRequestBody.lastname,
            totalprice: putRequestBody.totalprice,
            depositpaid: putRequestBody.depositpaid,
            additionalneeds: putRequestBody.additionalneeds
        }
    );
    expect(putRequestBody.bookingdates).toMatchObject({
        checkin: putRequestBody.bookingdates.checkin,
        checkout: putRequestBody.bookingdates.checkout,
    });
    console.log('All assertions successfully done.');

    console.log('\nPUT request successfully done');

    //------------------------------------------------------------

    console.log("\nDELETE request initiated");

    const deleteResponse = await request.delete(`/booking/${bookingID}`,
        {
            headers:
            {
                "Cookie": `token=${tokenResult}`
            }
        }
    );

    console.log("\nPerforming some assertions");
    expect(deleteResponse.ok()).toBeTruthy();
    expect(deleteResponse.statusText()).toBe('Created');
    expect(deleteResponse.status()).toBe(201);

    console.log('All assertions successfully done.');

    console.log('\nDELETE request successfully done');

    console.log("\nDELETE request initiated again after deletion");//16633

    const deleteResponse01 = await request.delete(`/booking/${bookingID}`,
        {
            headers:
            {
                "Cookie": `token=${tokenResult}`
            }
        }
    );

    console.log("\nPerforming some assertions");
    expect(deleteResponse01.statusText()).toBe('Method Not Allowed');
    expect(deleteResponse01.status()).toBe(405);

    console.log('All assertions successfully done.');

    console.log('\nDELETE request successfully done');



})