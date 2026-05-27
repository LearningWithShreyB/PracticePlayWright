import { test, expect } from '@playwright/test'
import putRequestBody from "../../testdata/put_request_body.json"
import tokenRequestBody from "../../testdata/token_request_body.json"
import postRequestBody from "../../testdata/post_request_body.json"

test('Verifying PUT Method', async ({ request }) => {

    //Creating a Token

    const tokenResponse = await request.post('/auth', { data: tokenRequestBody });
    const tokenResponseBody = await tokenResponse.json();

    expect(tokenResponse.ok()).toBeTruthy();
    expect(tokenResponse.status()).toBe(200);

    expect(tokenResponseBody).toHaveProperty("token");

    const tokenResult = tokenResponseBody.token;
    console.log(`Token ======> ${tokenResult}`);


    //Creating a POST request for new user and extracting bookingID

    const postResponse = await request.post('/booking', { data: postRequestBody });
    const postResponseBody = await postResponse.json();
    //console.log(`Post Method Response ====> ${postResponseBody}`);
    console.log("The response of Post request:");
    console.log(postResponseBody);

    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(200);

    expect(postResponseBody).toHaveProperty("bookingid");

    const bookindID = postResponseBody.bookingid;
    console.log(`Booking ID ======> ${bookindID}`);


    //Now updating the record by using booking ID and token

    const putResponse = await request.put(`/booking/${bookindID}`,
        {
            data: putRequestBody,
            headers:
            {
                "Cookie": `token=${tokenResult}`
            }
        }
    )

    const putResponseBody = await putResponse.json();
    //console.log(`Put Method Response ====> ${putResponseBody}`);
    console.log("The response of Put request:");
    console.log(putResponseBody);

    expect(putResponse.ok()).toBeTruthy();
    expect(putResponse.status()).toBe(200);

    //expect(putResponseBody).toHaveProperty("bookingid");

    expect(putResponseBody).toMatchObject(
        {
            firstname: putRequestBody.firstname,
            lastname: putRequestBody.lastname,
            totalprice: putRequestBody.totalprice
        }
    )

});
