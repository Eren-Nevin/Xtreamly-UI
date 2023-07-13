<script lang="ts">
	import AddAuthDataModal from './AddAuthDataModal.svelte';
	import Button from '$lib/components/Button.svelte';
	import TableRow from '$lib/components/TableRow.svelte';
	import AuthDetailsModal from '$lib/components/control-panel/AuthDetailsModal.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { AuthData, DApp, ProxyAccount } from '$lib/ProxyAccount';
	import { goto } from '$app/navigation';

	let showAddModal = false;
	let showDetailsModal = false;

	export let title: string;
	export let description: string;

	let selectedDid = '';
	const authDatas = getContext<Writable<AuthData[]>>('authDatas');
	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');
	const dapps = getContext<Writable<DApp[]>>('dapps');
</script>

<section class="text-gray-400 body-font w-full">
	<div class="flex flex-row justify-between items-end">
		<div class="flex flex-col items-start">
			<h1 class="sm:text-4xl text-3xl text-left font-medium title-font mb-2 text-gray-200">
				{title}
			</h1>
			<p class="text-left leading-relaxed text-base">{description}</p>
		</div>
		<div class="mx-1">
			<Button
				title="Browse"
				handler={() => {
					showAddModal = true;
				}}
			/>
		</div>
	</div>
	<div class="flex flex-col text-center w-full mb-4" />
	<div class="w-full mx-auto overflow-auto">
		<table class="table-auto w-full text-left whitespace-no-wrap">
			<thead>
				<tr>
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl"
					>
						DApp</th
					>
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
						>URL</th
					>
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
						>Contract Address</th
					>
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr"
					>
						Open
					</th>
				</tr>
			</thead>
			<tbody class="border">
				{#each $dapps as dapp}
					<TableRow>
						<p slot="col1">{dapp.name}</p>
						<p slot="col2">{dapp.url}</p>
						<p slot="col3">
							{dapp.address}
						</p>
						<Button
							slot="col4"
							title="Open"
							mx="0"
							handler={async () => {
								await goto(`./apps/${dapp.name}`);
								// selectedDid = authData.did;
								// showDetailsModal = true;
							}}
						/>
					</TableRow>
				{/each}
			</tbody>
		</table>
		<!-- <AddAuthDataModal -->
		<!-- 	bind:showModal={showAddModal} -->
		<!-- /> -->
		<!-- <AuthDetailsModal bind:selectedDid bind:showModal={showDetailsModal} /> -->
	</div>
</section>
