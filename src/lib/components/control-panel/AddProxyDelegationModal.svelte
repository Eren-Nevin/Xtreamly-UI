<script lang="ts">
	import { AuthData, DApp, Delegation, type ProxyAccount } from '$lib/ProxyAccount';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { saveState } from '$lib/db';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	export let showModal = false;
	let closeModal = false;

	export let selectedProxy: string;
	export let coins: string[];
	let selectedCoin: string;
	let selectedAmount: string;

	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');
	const authDatas = getContext<Writable<AuthData[]>>('authDatas');
	const dapps = getContext<Writable<DApp[]>>('dapps');

	$: proxy = selectedProxy ? $proxies.filter((p) => p.uid == selectedProxy)[0] : null;

	async function addDelegation(delegation: Delegation) {
		let newProxies: ProxyAccount[] = JSON.parse(JSON.stringify($proxies));
		newProxies = newProxies.map((p) => {
			if (p.uid === proxy?.uid) {
				p.delegations = [...p.delegations, delegation];
				return p;
			} else {
				return p;
			}
		});
		proxies.update((ps) => newProxies);
        await saveState($authDatas, $proxies, $dapps);
	}
</script>

<Modal bind:showModal bind:closeModal>
	<h3 slot="header">Add Delegation</h3>
	<div slot="body" class="flex flex-col w-full p-4">
		<div class="my-2 h-0.5 bg-gray-300" />
		<div class="flex flex-row w-full">
			<select
				bind:value={selectedCoin}
				class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
			>
				{#each coins as coin}
					<option>{coin}</option>
				{/each}
			</select>
			<input
				bind:value={selectedAmount}
				type="text"
				id="user-data"
				name="user-data"
				class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
			/>
		</div>

		<Button
			title="Save"
			handler={async () => {
				if (selectedAmount) {
					console.log(selectedAmount);
					await addDelegation(new Delegation(selectedCoin, selectedAmount));
				}
				selectedAmount = '0';
				closeModal = true;
			}}
		/>
	</div>
</Modal>
