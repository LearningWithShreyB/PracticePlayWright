import {test,expect} from '@playwright/test';
import tokenSourceRequestBody from '../../testdata/token_request_body.json';
import postSourceRequestBody from '../../testdata/post_request_body.json';
import putSourceRequestBody from '../../testdata/put_request_body.json';

test('Verifying E2E testing of CRUD operations',async ({request})=>
{
    console.log('Generating the Token');

    const tokenRequestBody=structuredClone(tokenSourceRequestBody);

    const tokenResponse=await request.post('/auth',
        {
            data:tokenRequestBody
        }
    );

    const tokenResponseBody=await tokenResponse.json();
    console.log('The response of POST request is:');
    console.log(tokenResponseBody);

    const tokenResult=tokenResponseBody.token;
    console.log(`Token ===> ${tokenResult}`);

    console.log('Token successfully generated');

    console.log('POST request initiated');

    const postRequestBody=structuredClone(postSourceRequestBody);

    const postResponse=await request.post('/auth',
        {
            data:postRequestBody
        }
    );

    const postResponseBody=await tokenResponse.json();
    console.log('The response of POST request is:');
    console.log(postResponseBody);

    const tokenResult=tokenResponseBody.token;
    console.log(`Token ===> ${tokenResult}`);

    console.log('Token successfully generated');


})