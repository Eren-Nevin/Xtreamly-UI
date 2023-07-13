<script lang="ts">
	// TODO: Fix closing the signup popup before actual signup
	import type { PageData } from './$types';
	export let data: PageData;
	const { dappName, dappAddress, generatedAccount } = data;
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import {
		ProxyAccount,
		type AuthData,
		Delegation,
		DApp,
		DynamicAccess,
		AppStoreApp
	} from '$lib/ProxyAccount';
	import { saveState } from '$lib/db';

	const dapps = getContext<Writable<DApp[]>>('dapps');
	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');
	const authDatas = getContext<Writable<AuthData[]>>('authDatas');
	const appStoreApps = getContext<Writable<AppStoreApp[]>>('appStoreApps');
	const dynamicAccess = getContext<Writable<DynamicAccess>>('dynamicAccess');

	console.log($authDatas);

	let dids = [];

	authDatas.subscribe((authDatas) => {
		dids = authDatas.map((e) => {
			return { authData: e, checked: true };
		});

		console.log(dids);
	});

	// let dids = {
	// 	age: {
	// 		checked: true,
	// 		did: 'did:xtreamly:1231248123124aace12'
	// 	},
	// 	twitch: {
	// 		checked: true,
	// 		did: 'did:xtreamly:1311a341be135123q'
	// 	},
	// 	nft: {
	// 		checked: true,
	// 		did: 'did:xtreamly:f1149759992375ea823c'
	// 	}
	// };

	let signupSuccess = false;
	let chooseXtreamly = false;
	let advancedAccessControl = false;

	async function buttonClickHandler() {
		if (signupSuccess) {
			window.close();
			return;
		}
		const newUserProxy = new ProxyAccount(generatedAccount, 'Idle', '', '', []);

		const newProxies = JSON.parse(JSON.stringify($proxies));

		// TODO: Don't push if already there
		newProxies.push(newUserProxy);
		proxies.update((ps) => newProxies);

		const newAuthDatas = JSON.parse(JSON.stringify($authDatas));

		newAuthDatas.map((ad) => {
			for (let did of dids) {
				if (ad.did === did.authData.did) {
					if (did.checked) {
						// TODO: Don't push if already there
						ad.accessedBy.push(dappAddress);
						return ad;
					}
				}
			}
			return ad;
		});
		authDatas.update((prev) => newAuthDatas);

		// TODO: For dev, remove later
		await saveState($authDatas, $proxies, $dapps, $appStoreApps, $dynamicAccess);

		// This makes sure that if we close without signing up, the axie page doesn't
		// change
		window.opener.postMessage({ signedUp: true }, '*');

		signupSuccess = true;
	}
</script>

<div class="flex flex-col w-full py-2 px-4 space-y-2">
	{#if chooseXtreamly}
		{#if signupSuccess}
			<h1 class="font-semibold text-lg text-gray-700 p-2">Signup Successful</h1>
			<div class="flex flex-col p-2 rounded-md bg-gray-200">
				<p class="font-light text-sm">Generated Account:</p>
				<p class="font-light text-sm">{`${generatedAccount.substring(0, 16)}...`}</p>
			</div>
		{:else}
			<h1 class="font-semibold text-lg text-gray-700 p-2">Signup</h1>
			<h1 class="text-md text-gray-700 p-2">Requester Info</h1>
			<div class="flex flex-col p-2 rounded-md bg-gray-200">
				<p class="font-light text-sm">Dapp Name: {dappName}</p>
				<p class="font-light text-sm">Dapp Address: {`${dappAddress.substring(0, 16)}...`}</p>
			</div>

			<h1 class="text-md text-gray-700 p-2">Datas</h1>
			<div class="flex flex-col p-2 rounded-md bg-gray-200">
				<label class="label cursor-pointer">
					<span class="label-text">Dynamic Access Control</span>
					<input
						type="checkbox"
						class="toggle toggle-secondary"
						bind:checked={advancedAccessControl}
					/>
				</label>

				<!-- {#if !advancedAccessControl} -->
				{#if !advancedAccessControl}
					<div class="form-control">
						{#each dids as did}
							<label class="label cursor-pointer">
								<span class="label-text">{`${did.authData.content.split('=')[0]}`}</span>
								<input
									type="checkbox"
									class="toggle"
									bind:checked={did.checked}
									disabled={advancedAccessControl}
								/>
							</label>
						{/each}
						<!-- <label class="label cursor-pointer"> -->
						<!-- 	<span class="label-text">Twitch Followers</span> -->
						<!-- 	<input -->
						<!-- 		type="checkbox" -->
						<!-- 		class="toggle" -->
						<!-- 		bind:checked={dids.twitch.checked} -->
						<!-- 		disabled={advancedAccessControl} -->
						<!-- 	/> -->
						<!-- </label> -->
						<!-- <label class="label cursor-pointer"> -->
						<!-- 	<span class="label-text">That NFT</span> -->
						<!-- 	<input -->
						<!-- 		type="checkbox" -->
						<!-- 		class="toggle" -->
						<!-- 		bind:checked={dids.nft.checked} -->
						<!-- 		disabled={advancedAccessControl} -->
						<!-- 	/> -->
						<!-- </label> -->
					</div>
				{/if}

				{#if advancedAccessControl}
					<textarea
						class="w-64 h-96 border border-gray-300 rounded-md
            p-4 my-4 text-sm"
						bind:value={$dynamicAccess.code}
						placeholder="Program Here"
					/>
				{/if}
			</div>
		{/if}
		<button class="btn btn-secondary" on:click={buttonClickHandler}>
			{signupSuccess ? 'Return' : 'Signup'}
		</button>
	{:else}
		<button class="btn btn-secondary my-1"> Signup with Real Account </button>
		<button
			class="btn btn-secondary my-1"
			on:click={() => {
				chooseXtreamly = true;
			}}
		>
			Signup with Xtreamly Proxy
		</button>
	{/if}
</div>
