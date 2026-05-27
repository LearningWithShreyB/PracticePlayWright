import { test, expect } from '@playwright/test';
import tokenSourceRequestBody from '../../testdata/token_request_body.json';
import postSourceRequestBody from '../../testdata/post_request_body.json';
import putSourceRequestBody from '../../testdata/put_request_body.json';

test('Verifying E2E testing of CRUD operations', async ({ request }) => {
    console.log('\nGenerating the Token');

    const tokenRequestBody = structuredClone(tokenSourceRequestBody);

    const tokenResponse = await request.post('/auth',
        {
            data: tokenRequestBody
        }
    );

    const tokenResponseBody = await tokenResponse.json();
    console.log('\nThe response of POST request is:');
    console.log(tokenResponseBody);

    console.log("Performing some assertions:");
    expect(tokenResponse.ok()).toBeTruthy();
    expect(tokenResponse.status()).toBe(200);

    expect(tokenResponseBody).toHaveProperty('token');
    console.log('All assertions successfully done.');

    const tokenResult = tokenResponseBody.token;
    console.log(`Token ===> ${tokenResult}`);

    console.log('\nToken successfully generated');

    console.log('\nPOST request initiated');

    const postRequestBody = structuredClone(postSourceRequestBody);

    const postResponse = await request.post('/booking',
        {
            data: postRequestBody
        }
    );

    const postResponseBody = await postResponse.json();
    console.log('\nThe response of POST request is:');
    console.log(postResponseBody);

    console.log("Performing some assertions:");
    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(200);

    expect(postResponseBody).toHaveProperty("bookingid");
    console.log('All assertions successfully done.');

    const bookingID = postResponseBody.bookingid;
    console.log(`Booking ID ===> ${bookingID}`);

    console.log('\nPOST request successfully done');

    console.log("\nGET request initiated");

    const getResponse=await request.get(`/booking/${bookingID}`);

    const getResponseBody=await getResponse.json();

    console.log('\nThe response of GET request is:');
    console.log(getResponseBody);

    console.log("Performing some assertions");
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);

    expect(getResponseBody.firstname).toBe(postResponseBody.booking.firstname);
    console.log('All assertions successfully done.');

    console.log('\nGET request successfully done');

    console.log("\nDELETE request initiated");

    const deleteResponse=await request.delete(`/booking/${bookingID}`,
        {
            headers:
            {
                "Cookie" : `token=${tokenResult}`
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

    const deleteResponse01=await request.delete(`/booking/${bookingID}`,
        {
            headers:
            {
                "Cookie" : `token=${tokenResult}`
            }
        }
    );

    console.log("\nPerforming some assertions");
    expect(deleteResponse01.statusText()).toBe('Method Not Allowed');
    expect(deleteResponse01.status()).toBe(405);

    console.log('All assertions successfully done.');

    console.log('\nDELETE request successfully done');

    

})