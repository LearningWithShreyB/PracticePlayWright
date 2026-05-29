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

    console.log("\nPerforming some assertions:");
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
    console.log('\nAll assertions successfully done.');

    const bookingID = postResponseBody.bookingid;
    console.log(`\nBooking ID ===> ${bookingID}`);

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

    console.log("\nPerforming some assertions:");
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
    console.log('\nAll assertions successfully done.');

    console.log('\nPUT request successfully done');

    //------------------------------------------------------------

    console.log("\nGET request initiated for Put Method");

    const getStartTime2 = Date.now();

    const getResponse2 = await request.get(`/booking/${bookingID}`);

    const getEndTime2 = Date.now();

    console.log('\nThe logging of second GET request is:');
    console.log(getResponse2);

    const getResponseBody2 = await getResponse2.json();

    console.log('\nThe response of second GET request is:');
    console.log(getResponseBody2);

    console.log("\nPerforming some assertions");
    expect(getResponse2.statusText()).toBe('OK');
    expect(getResponse2.status()).toBe(200);

    const getHeaders2 = getResponse2.headers();
    expect(getHeaders2['content-type']).toContain("application/json; charset=utf-8");

    const getResponseTime2 = getEndTime2 - getStartTime2;
    console.log("\nResponse Time ===>", getResponseTime2);
    expect(getResponseTime2).toBeLessThan(5000);

    expect(getResponseBody2.firstname).toBe(putResponseBody.firstname);

    expect(getResponseBody2).toMatchObject(
        {
            firstname: putRequestBody.firstname,
            lastname: putRequestBody.lastname,
            totalprice: putRequestBody.totalprice,
            depositpaid: putRequestBody.depositpaid,
            additionalneeds: putRequestBody.additionalneeds
        }
    );

    expect(getResponseBody2.bookingdates).toMatchObject(
        {
            checkin: putRequestBody.bookingdates.checkin,
            checkout: putRequestBody.bookingdates.checkout
        }
    )
    console.log('\nAll assertions successfully done.');

    console.log('\nGET request successfully done');

    //------------------------------------------------------------

    console.log('\nPATCH request initiated');

    const patchRequestBody = structuredClone(patchSourceRequestBody);

    const patchStartTime = Date.now();

    const patchResponse = await request.patch(`/booking/${bookingID}`,
        {
            data: patchRequestBody,
            headers:
            {
                "Content-Type": "application/json",
                "Cookie": `token=${tokenResult}`
            }
        }
    );

    const patchEndTime = Date.now();

    console.log('\nThe logging of PATCH request is:');
    console.log(patchResponse);

    const patchResponseBody = await patchResponse.json();
    console.log('\nThe response of PATCH request is:');
    console.log(patchResponseBody);

    console.log("\nPerforming some assertions:");
    expect(patchResponse.statusText()).toBe('OK');
    expect(patchResponse.status()).toBe(200);

    const patchHeaders = patchResponse.headers();
    expect(patchHeaders['content-type']).toContain("application/json; charset=utf-8");

    const patchResponseTime = patchEndTime - patchStartTime;
    console.log("\nResponse Time ===>", patchResponseTime);
    expect(patchResponseTime).toBeLessThan(5000);

    expect(patchResponseBody).toMatchObject(
        {
            firstname: patchRequestBody.firstname,
            lastname: patchRequestBody.lastname,
            totalprice: putRequestBody.totalprice,
            depositpaid: putRequestBody.depositpaid,
            additionalneeds: patchRequestBody.additionalneeds
        }
    );
    expect(putRequestBody.bookingdates).toMatchObject({
        checkin: putRequestBody.bookingdates.checkin,
        checkout: putRequestBody.bookingdates.checkout,
    });
    console.log('\nAll assertions successfully done.');

    console.log('\nPATCH request successfully done');

    //------------------------------------------------------------

    console.log("\nGET request initiated for Patch Method");

    const getStartTime3 = Date.now();

    const getResponse3 = await request.get(`/booking/${bookingID}`);

    const getEndTime3 = Date.now();

    console.log('\nThe logging of third GET request is:');
    console.log(getResponse3);

    const getResponseBody3 = await getResponse3.json();

    console.log('\nThe response of third GET request is:');
    console.log(getResponseBody3);

    console.log("\nPerforming some assertions");
    expect(getResponse3.statusText()).toBe('OK');
    expect(getResponse3.status()).toBe(200);

    const getHeaders3 = getResponse3.headers();
    expect(getHeaders3['content-type']).toContain("application/json; charset=utf-8");

    const getResponseTime3 = getEndTime3 - getStartTime3;
    console.log("\nResponse Time ===>", getResponseTime3);
    expect(getResponseTime3).toBeLessThan(5000);

    expect(getResponseBody3.firstname).toBe(patchResponseBody.firstname);

    expect(getResponseBody3).toMatchObject(
        {
            firstname: patchRequestBody.firstname,
            lastname: patchRequestBody.lastname,
            totalprice: putRequestBody.totalprice,
            depositpaid: putRequestBody.depositpaid,
            additionalneeds: patchRequestBody.additionalneeds
        }
    );

    expect(getResponseBody3.bookingdates).toMatchObject(
        {
            checkin: putRequestBody.bookingdates.checkin,
            checkout: putRequestBody.bookingdates.checkout
        }
    )
    console.log('\nAll assertions successfully done.');

    console.log('\nGET request successfully done');

    //------------------------------------------------------------

    console.log("\nDELETE request initiated");

    const deleteStartTime1 = Date.now();

    const deleteResponse1 = await request.delete(`/booking/${bookingID}`,
        {
            headers:
            {
                "Cookie": `token=${tokenResult}`
            }
        }
    );

    const deleteEndTime1 = Date.now();

    console.log('\nThe logging of DELETE request is:');
    console.log(deleteResponse1);

    const deleteResponseBody1 = await deleteResponse1.text();

    console.log('\nThe response of DELETE request is:');
    console.log(deleteResponseBody1);

    console.log("\nPerforming some assertions");
    expect(deleteResponse1.statusText()).toBe('Created');
    expect(deleteResponse1.status()).toBe(201);

    const deleteHeaders1 = deleteResponse1.headers();
    expect(deleteHeaders1['content-type']).toContain("text/plain; charset=utf-8");

    const deleteResponseTime1 = deleteEndTime1 - deleteStartTime1;
    console.log("\nResponse Time ===>", deleteResponseTime1);
    expect(deleteResponseTime1).toBeLessThan(5000);

    expect(deleteResponseBody1).toBe('Created');

    console.log('All assertions successfully done.');

    console.log('\nDELETE request successfully done');

    console.log("\nDELETE request initiated again after deletion");

   const deleteStartTime2 = Date.now();

    const deleteResponse2 = await request.delete(`/booking/${bookingID}`,
        {
            headers:
            {
                "Cookie": `token=${tokenResult}`
            }
        }
    );

    const deleteEndTime2 = Date.now();

    console.log('\nThe logging of DELETE request is:');
    console.log(deleteResponse2);

    const deleteResponseBody2 = await deleteResponse2.text();

    console.log('\nThe response of DELETE request is:');
    console.log(deleteResponseBody2);

    console.log("\nPerforming some assertions");
    expect(deleteResponse2.statusText()).toBe('Method Not Allowed');
    expect(deleteResponse2.status()).toBe(405);

    const deleteHeaders2 = deleteResponse2.headers();
    expect(deleteHeaders2['content-type']).toContain("text/plain; charset=utf-8");

    const deleteResponseTime2 = deleteEndTime2 - deleteStartTime2;
    console.log("\nResponse Time ===>", deleteResponseTime2);
    expect(deleteResponseTime2).toBeLessThan(5000);

    expect(deleteResponseBody2).toBe('Method Not Allowed');

    console.log('All assertions successfully done.');

    console.log('\nDELETE request successfully done');

})