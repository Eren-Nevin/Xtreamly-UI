<script lang="ts">
	import { AuthData, DApp, ProxyAccount } from '$lib/ProxyAccount';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { saveState } from '$lib/db';
	import { generateRandomAccount } from '$lib/utils';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	export let title: string;
	export let showModal: boolean;
	let closeModal = false;

	$: generatedProxyAccount = showModal ? generateRandomAccount() : generateRandomAccount();

	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');
	const authDatas = getContext<Writable<AuthData[]>>('authDatas');
	const dapps = getContext<Writable<DApp[]>>('dapps');

	async function addToProxy(uid: string) {
		proxies.update((proxies) => {
			const newProxies: ProxyAccount[] = JSON.parse(JSON.stringify(proxies));

			newProxies.push(new ProxyAccount(uid, 'Idle', '', 'Blank', []));

			return newProxies;
		});
		await saveState($authDatas, $proxies, $dapps);
	}

</script>

<Modal bind:showModal bind:closeModal>
	<h3 slot="header">{title}</h3>
	<div slot="body" class="flex flex-col w-full items-center">
		<div class="w-96">
			<div class="flex flex-row w-full items-center justify-start my-2">
				<p>Address:</p>
				<p class="mx-4">{generatedProxyAccount}</p>
			</div>
			<div class="flex flex-row w-full justify-center">
				<Button
					title="Save"
					handler={async () => {
						showModal = false;
						closeModal = true;
						await addToProxy(generatedProxyAccount);
					}}
				/>
			</div>
		</div>
	</div>
</Modal>
