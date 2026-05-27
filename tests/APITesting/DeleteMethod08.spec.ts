import { test, expect } from "@playwright/test";
import postSourceRequestBody from "../../testdata/post_request_body.json" with { type: "json" };
import tokenSourceRequestBody from "../../testdata/token_request_body.json" with { type: "json" };

test("POST Request Using JSON File", async ({ request }) => {

    const postRequestBody = structuredClone(postSourceRequestBody);

    //Sending Post Request
    const postResponse = await request.post("/booking", { data: postRequestBody });
    const postResponseBody = await postResponse.json();
    console.log(postResponseBody);

    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(200);

    expect(postResponseBody).toHaveProperty("bookingid");

    const bookingID = await postResponseBody.bookingid;
    console.log(`Booking ID ===> ${bookingID}`);


    //Token Creation

    const tokenRequestBody = structuredClone(tokenSourceRequestBody);

    const tokenResponse = await request.post("/auth",
        {
            data: tokenRequestBody
        }
    );

    const tokenResponseBody = await tokenResponse.json();

    const tokenResult = tokenResponseBody.token;
    console.log(`Token ===> ${tokenResult}`);

    //Deleting the record

    const deleteResponse = await request.delete(`/booking/${bookingID}`,
        {
            headers:
            {
                "Cookie": `token=${tokenResult}`
            }
        }
    );

    expect(deleteResponse.statusText()).toBe('Created');
    expect(deleteResponse.status()).toBe(201);






})