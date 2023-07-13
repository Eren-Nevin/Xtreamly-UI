import type { RequestEvent, RequestHandler } from './$types';
import { error, json, text } from '@sveltejs/kit';

export const POST = (async ({ url, request }) => {
    let body = await request.text()
    console.log("body[5]: = ", body)
    return text(body);
}) satisfies RequestHandler;
