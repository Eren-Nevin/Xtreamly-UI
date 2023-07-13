<script lang="ts">
	import { EVMHandlerV5, ContractType } from 'xtreamly_sdk';
	import { sendTransaction } from '$lib/chain';

	let amount = new URLSearchParams(window.location.search).get('amount') || '38';

	import type { PageData } from './$types';
	export let data: PageData;
	const { dappName, dappAddress, generatedAccount, subAppId38USDT, subAppId56USDT } = data;

	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import {
		ProxyAccount,
		type AuthData,
		Delegation,
		DApp,
		AppStoreApp,
		DynamicAccess
	} from '$lib/ProxyAccount';
	import { saveState } from '$lib/db';
	import { goto } from '$app/navigation';

	const knowUSDTContractPublicAddress = '0x30B4A636C591f26D393C9B26E611945Dc7E4d75E';

	const dapps = getContext<Writable<DApp[]>>('dapps');
	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');
	const authDatas = getContext<Writable<AuthData[]>>('authDatas');
	const appStoreApps = getContext<Writable<AppStoreApp[]>>('appStoreApps');
	const dynamicAccess = getContext<Writable<DynamicAccess>>('dynamicAccess');

	let codeToDeploy = '';

	async function deployCodeToSelectedProxy(code: string) {
		proxies.update((state) => {
			let oldProxies: ProxyAccount[] = JSON.parse(JSON.stringify(state));
			// oldProxies.push(account);
			let newProxies = oldProxies.map((p) => {
				if (p.uid === generatedAccount) {
					p.status = 'Running';
					p.code = appToInstall?.code || '';
					p.program = appToInstall?.name || '';
					p.delegations = [new Delegation('USDT', amount)];
					return p;
				} else {
					return p;
				}
			});
			return newProxies;
		});
	}

	async function onDeploy() {
		await deployCodeToSelectedProxy(codeToDeploy);
		const evmHandler = new EVMHandlerV5();
		await evmHandler.initialize();
		const contract = evmHandler.getContract(ContractType.ERC20, knowUSDTContractPublicAddress);

		// TODO: Add this back

		const tx = await evmHandler.approveTransferERC20(
			contract,
			generatedAccount,
			BigInt(amount) * 1000000000000000000n
		);

		await tx.wait();

		await sendTransaction(generatedAccount, amount);
		//
		await saveState($authDatas, $proxies, $dapps, $appStoreApps, $dynamicAccess);

		// This makes sure that if we close without installing, the page doesn't
		// change
		window.opener.postMessage({ subscribed: true }, '*');

		installSuccess = true;
	}

	let appToInstall: AppStoreApp | undefined;

	$: appToInstall = $appStoreApps.filter(
		(app) => app.id === (amount === '38' ? subAppId38USDT : subAppId56USDT)
	)[0];

	let installSuccess = false;
</script>

<div class="flex flex-col w-full py-2 px-4 space-y-2">
	{#if installSuccess && appToInstall}
		<h1 class="font-semibold text-lg text-gray-700 p-2">Congratulations</h1>
		<p>You've installed {appToInstall.name}</p>
		<button
			class="btn btn-primary"
			on:click={() => {
				goto('/popup/control');
				// goto('/control-panel');
			}}
		>
			Control Panel
		</button>
	{:else if appToInstall}
		<h1 class="font-semibold text-lg text-gray-700 p-2">Install App</h1>
		<div class="flex flex-col p-2 rounded-md bg-gray-200">
			<p class="font-light text-sm">App Name: {appToInstall.name}</p>
			<p class="font-light text-sm">Publisher: {appToInstall.url}</p>
			<p class="font-light text-sm">Description: {appToInstall.description}</p>
		</div>
		<div class="collapse collapse-arrow bg-gray-200 m-1">
			<input type="checkbox" />
			<div class="collapse-title flex flex-row px-6 py-2 bg-gray-200 space-x-2 items-center">
				<h1 class="text-xs mr-auto">Code</h1>
			</div>
			<div class="collapse-content">
				<textarea
					class="w-64 h-96 border border-gray-300 rounded-md
            p-4 my-4 text-sm"
					value={appToInstall.code}
				/>
			</div>
		</div>
		<button class="btn btn-primary" on:click={onDeploy}> Install </button>
	{/if}
</div>
