import { test, expect } from '@playwright/test'
import patchSourceRequestBody from '../../testdata/patch_request_body.json' with {type: "json"};
import tokenSourceRequestBody from "../../testdata/token_request_body.json" with {type: "json"};
import postSourceRequestBody from "../../testdata/post_request_body.json" with {type: "json"};

test('Verifying Patch request', async ({ request }) => {

    //Creating a token

    const tokenRequestBody = structuredClone(tokenSourceRequestBody);

    const tokenResponse = await request.post("/auth",
        {
            data: tokenRequestBody
        }
    );

    const tokenResponseBody = await tokenResponse.json();

    const tokenResult = tokenResponseBody.token;
    console.log(`Token ===> ${tokenResult}`);

    //Creating a post request

    const postRequestBody = structuredClone(postSourceRequestBody);

    const postResponse = await request.post("/booking",
        {
            data: postRequestBody
        }
    );

    const postResponseBody = await postResponse.json();
    console.log("The response of Post request:");
    console.log(postResponseBody);

    const bookingID = await postResponseBody.bookingid;
    console.log(`Booking ID ===> ${bookingID}`);

    //Finally creating patch request from Token and bookingID

    const patchRequestBody = structuredClone(patchSourceRequestBody);

    const patchResponse = await request.patch(`/booking/${bookingID}`,
        {
            data: patchRequestBody,
            headers:
            {
                "Cookie": `token=${tokenResult}`
            }
        }
    );

    const patchResponseBody = await patchResponse.json();
    console.log("The response of Patch request:");
    console.log(patchResponseBody);

    expect(patchResponse.ok()).toBeTruthy();
    expect(patchResponse.status()).toBe(200);

    expect(patchResponseBody).toMatchObject(
        {
            firstname: patchRequestBody.firstname,
            lastname: patchRequestBody.lastname,
            additionalneeds: patchRequestBody.additionalneeds
        }
    )

})

