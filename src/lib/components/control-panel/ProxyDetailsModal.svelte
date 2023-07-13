<script lang="ts">
	import AddProxyDelegationModal from './AddProxyDelegationModal.svelte';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { AuthData, DApp, ProxyAccount } from '$lib/ProxyAccount';
	import { saveState } from '$lib/db';
	export let showModal = false;
	let closeModal = false;
	let showAddDelegationModal = false;

	export let selectedProxy: string;

	let coins = ['USDT', 'TRCUSDT', 'SHIBA'];

	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');
	const authDatas = getContext<Writable<AuthData[]>>('authDatas');
	const dapps = getContext<Writable<DApp[]>>('dapps');

	$: proxy = selectedProxy ? $proxies.filter((p) => p.uid == selectedProxy)[0] : null;

	async function removeDelegation(token: string) {
		let newProxies: ProxyAccount[] = JSON.parse(JSON.stringify($proxies));
		newProxies = newProxies.map((p) => {
			if (p.uid === proxy?.uid) {
				p.delegations = p.delegations.filter((d) => d.token !== token);
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
	<h3 slot="header">Proxy Details</h3>
	<div slot="body" class="flex flex-col w-full p-4">
		<div class="my-2 h-0.5 bg-gray-300" />
		{#if proxy}
			<div class="flex flex-row w-full">
				<div class="flex flex-col mr-4">
					<p class="mx-2 my-2">Delegations</p>
					{#each proxy.delegations as delegation}
						<div class="flex flex-row items-center justify-between">
							<p class="mx-2 text-sm">{delegation.token}</p>
							<p class="mx-2 text-sm">{delegation.amount}</p>
							<Button
								title="Remove"
								handler={async () => {
									await removeDelegation(delegation.token);
								}}
							/>
						</div>
					{/each}
					<Button
						title="Add / Change"
						addClass="justify-center"
						handler={() => {
							showAddDelegationModal = true;
						}}
					/>
				</div>
				<div class="w-0.5 h-120 bg-gray-300" />
				<div class="w-1/3 flex flex-col ml-4 justify-center">
					<h3 class="mx-2 my-2">Program</h3>
					<textarea
						class="w-72 h-96 border border-gray-300 rounded-md
            p-4 my-4 text-sm"
						bind:value={proxy.code}
						placeholder="Program Here"
					/>
					<Button
						title="Close"
						handler={async () => {
							closeModal = true;
						}}
					/>
				</div>
			</div>
		{/if}
	</div>
</Modal>
<AddProxyDelegationModal bind:showModal={showAddDelegationModal} bind:coins bind:selectedProxy />
