<script lang="ts">
	import AddProxyAccountModal from './AddProxyAccountModal.svelte';
	import Button from '$lib/components/Button.svelte';
	import TableRow5Col from '$lib/components/TableRow5Col.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { ProxyAccount } from '$lib/ProxyAccount';
	import ProxyDetailsModal from './ProxyDetailsModal.svelte';

	let showAddModal = false;
	let closeAddModal = false;

	let showDetailsModal = false;
	let closeDetailsModal = false;

	export let title: string;
	export let description: string;

	let selectedProxy = '';
	const proxies = getContext<Writable<ProxyAccount[]>>('proxies');
	// TODO: Add a column for apps that use this
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
				title="New"
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
						Status</th
					>
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
						>Address</th
					>
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
						>Program</th
					>
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
						>Delegated</th
					>
					<th
						class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr"
					>
						Details
					</th>
				</tr>
			</thead>
			<tbody class="border">
				{#each $proxies as proxy}
					<TableRow5Col>
						<p slot="col1">{proxy.status}</p>
						<p slot="col2">
							{`${proxy.uid.substring(0, 16)}...`}
						</p>
						<div
							slot="col3"
							class="flex flex-row justify-start
                        items-center"
						>
							<p>{proxy.program}</p>
						</div>
						<div slot="col4">
							{#each proxy.delegations as delegation}
								<div class="flex flex-col justify-center">
									<p>{delegation.token}: {delegation.amount}</p>
								</div>
							{/each}
						</div>
						<Button
							slot="col5"
							title="Details"
							mx="0"
							handler={async () => {
								selectedProxy = proxy.uid;
								showDetailsModal = true;
							}}
						/>
					</TableRow5Col>
				{/each}
			</tbody>
		</table>
		<AddProxyAccountModal  bind:showModal={showAddModal} title="Generate Proxy Account" />
		<ProxyDetailsModal bind:showModal={showDetailsModal} bind:selectedProxy />
	</div>
</section>
