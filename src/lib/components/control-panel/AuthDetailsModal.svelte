<script lang="ts">
	import type { AuthData, DApp, ProxyAccount } from '$lib/ProxyAccount';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { saveState } from '$lib/db';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	export let showModal = false;
	let closeModal = false;

	export let selectedDid = '';

	const authDatas = getContext<Writable<AuthData[]>>('authDatas');
	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');
	const dapps = getContext<Writable<DApp[]>>('dapps');
	$: authData = selectedDid ? $authDatas.filter((ad) => ad.did == selectedDid)[0] : null;

	async function removeAccess(accessAddress: string) {
		let newAuths: AuthData[] = JSON.parse(JSON.stringify($authDatas));
		newAuths = newAuths.map((a) => {
			if (a.did === authData?.did) {
				a.accessedBy = a.accessedBy.filter((aa) => aa !== accessAddress);
				return a;
			} else {
				return a;
			}
		});
		authDatas.update((c) => {
			return newAuths;
		});
		await saveState($authDatas, $proxies, $dapps);
	}
</script>

<Modal bind:showModal bind:closeModal>
	<h3 slot="header">DID Details</h3>
	<div slot="body" class="flex flex-col w-full p-4">
		<div class="my-2 h-0.5 bg-gray-300" />
		{#if authData}
			<div class="flex flex-row w-full">
				<div class="flex flex-col mr-4">
					<p class="mx-2">Accessed By:</p>
					{#if authData.accessedBy}
						{#each authData.accessedBy as accessed}
							<div class="flex flex-row items-center">
								<p class="mx-2 text-sm">{accessed}</p>
								<Button
									title="Revoke"
									handler={async () => {
										await removeAccess(accessed);
									}}
								/>
							</div>
						{/each}
					{:else}
						<p>None</p>
					{/if}
				</div>
				<div class="w-0.5 h-120 bg-gray-300" />
				<div class="w-96 flex flex-col ml-4 justify-center">
					<h3>Access Control Program</h3>
					<textarea
						class="w-72 h-96 border border-gray-300 rounded-md
            p-4 my-4 text-sm"
						bind:value={authData.code}
						placeholder="Program Here"
					/>
					<Button
						title="Save"
						handler={async () => {
							showModal = false;
							closeModal = true;
						}}
					/>
				</div>
			</div>
		{/if}
	</div>
</Modal>
