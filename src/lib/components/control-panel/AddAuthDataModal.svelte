<script lang="ts">
	import { AuthData, ProxyAccount, DApp } from '$lib/ProxyAccount';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { saveState } from '$lib/db';
	import { generateRandomAccount } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let showModal = false;
	let closeModal = false;

	let content = '';

	const authDatas = getContext<Writable<AuthData[]>>('authDatas');
	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');
	const dapps = getContext<Writable<DApp[]>>('dapps');

	// TODO: This should be called on canister
	async function generateAuthData(content: string) {
		// TODO: Add timeout

		return new AuthData('did:xtreamly:139129386189724612', content, [], generateRandomAccount());
	}

	async function addAuthData(authData: AuthData) {
		authDatas.update((datas) => {
			const newAuthDatas: AuthData[] = JSON.parse(JSON.stringify(datas));
			newAuthDatas.push(authData);
			return newAuthDatas;
		});
		await saveState($authDatas, $proxies, $dapps);
	}
</script>

<Modal bind:showModal bind:closeModal>
	<div slot="body" class="flex flex-col w-full items-start">
		<label
			for="user-data"
			class="leading-7 text-sm text-gray-600
                    py-1
                    ">Enter Data</label
		>
		<input
			bind:value={content}
			type="text"
			id="user-data"
			name="user-data"
			class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
		/>
		<div class="w-full flex flex-row justify-center">
			<Button
				title="Save"
				handler={async () => {
					// TODO: generate did

					let res = await generateAuthData(content);

					await addAuthData(res);

					showModal = false;
					closeModal = true;
				}}
			/>
		</div>
	</div>
</Modal>
