import type { AuthData, ProxyAccount } from '$lib/ProxyAccount';
import { ethers } from 'ethers';
import type { RequestEvent, RequestHandler } from './$types';
import { error, json, text } from '@sveltejs/kit';
import ERC20 from './ERC20.json';

// import { EVMHandlerV5, ContractType } from 'xtreamly_sdk';

import fs from 'fs';

const provider = new ethers.providers.JsonRpcProvider('https://test.xtreamly.io:8544');

const wallet = new ethers.Wallet('258d7649d70ec76fd66d2a41e5edaaf908a831340f5976314566ef120423b8fc', provider);

console.log(wallet);

export const POST = (async ({ url, request }) => {
    let save = url.searchParams.get('save');
    if (save) {
        let body = await request.text()
        fs.writeFileSync('./appData/data.json', body);
        console.log(body);
        return text('Saved');
    }
    else {
        let address = url.searchParams.get('address');
        let amount = url.searchParams.get('amount');
        if (address && amount) {
            console.log(wallet);
            console.log(address);
            console.log(amount);




            const contract = new ethers.Contract(
                '0x30B4A636C591f26D393C9B26E611945Dc7E4d75E',
                ERC20.abi,
                wallet,
            );

            const tx = await contract.transfer(address,
                BigInt(amount) * 1000000000000000000n
            );
            await tx.wait();

            return json({});

        }
        else {
            let body = fs.readFileSync('./appData/data.json', 'utf8');
            return json(body);
        }
    }

}) satisfies RequestHandler;
