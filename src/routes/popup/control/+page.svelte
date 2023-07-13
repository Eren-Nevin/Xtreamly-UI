<script lang="ts">
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

	let activeTab = 'App Store';

	import logo from '$lib/assets/download.svg';
	let advancedAccessControl = false;
</script>

<div class="w-full tabs">
	<a
		class="tab w-1/3 tab-bordered {activeTab === 'Proxies' ? 'tab-active' : ''}"
		on:click={() => {
			activeTab = 'Proxies';
		}}>Proxies</a
	>
	<a
		class="tab w-1/3 tab-bordered {activeTab === 'Data' ? 'tab-active' : ''}"
		on:click={() => {
			activeTab = 'Data';
		}}>Data</a
	>
	<a
		class="tab w-1/3 tab-bordered {activeTab === 'App Store' ? 'tab-active' : ''}"
		on:click={() => {
			activeTab = 'App Store';
		}}>Applets</a
	>
</div>
<div class="w-auto flex flex-col items-center py-2">
	{#if activeTab === 'App Store'}
		<div class="w-full flex flex-col items-center px-2">
		{#each $appStoreApps as app}
			<div
				class="w-full flex flex-row mx-2 my-1 px-4 bg-gray-200 items-center rounded-md opacity-75 space-x-2"
			>
				<img src={app.logoUrl} class="w-10 h-10 my-2 mr-1" />
				<div class="h-20 flex flex-auto flex-col my-2 justify-center">
					<h1 class="font-semibold text-[12px]">{app.name}</h1>
					<p class="text-xs text-gray-500">{app.url}</p>
					<div class="flex flex-row space-x-2 items-center mt-2">
						<div class="rating rating-xs">
							<input type="radio" name="rating-1" class="mask mask-star" />
							<input type="radio" name="rating-1" class="mask mask-star" />
							<input type="radio" name="rating-1" class="mask mask-star" />
							<input type="radio" name="rating-1" class="mask mask-star" />
							<input type="radio" name="rating-1" class="mask mask-star" checked />
						</div>
						<p class="text-xs text-gray-500">3.7K</p>
					</div>
				</div>
				<a href="#">
					<img src={logo} class="w-10 h-10 my-2" />
				</a>
			</div>
		{/each}
    </div>
	{:else if activeTab === 'Data'}
		<div class="w-full flex flex-col items-center px-2">
			<div class="flex flex-row space-x-2 items-center">
				<label class="label cursor-pointer flex flex-row space-x-2">
					<span class="label-text font-light">Dynamic Access Control</span>
					<input type="checkbox" class="toggle" bind:checked={advancedAccessControl} />
				</label>
				<button class="btn btn-cirlce btn-secondary btn-sm">Add</button>
			</div>
			{#if advancedAccessControl}
				<!-- <p>Dynamic Access Control Dropdown</p> -->
				<textarea
					class="w-72 h-96 border border-gray-300 rounded-md
            p-4 my-4 text-sm"
					bind:value={$dynamicAccess.code}
					placeholder="Program Here"
				/>
			{:else}
				{#each $authDatas as authData}
					<div class="collapse collapse-arrow bg-gray-200 m-1">
						<input type="checkbox" />
						<div
							class="collapse-title w-full flex flex-row px-6 py-2 bg-gray-200 rounded-md space-x-2 items-center"
						>
							<h1 class="text-xs mr-auto">{authData.content}</h1>
						</div>
						<div class="collapse-content">
							<p class="text-sm font-light">
								Address: {`${authData.contractAddress.substring(0, 16)}...`}
							</p>
							<div class="divider my-1" />
							<p class="text-sm font-light">Accessed by:</p>
							<ul class="font-light list-disc">
								{#each authData.accessedBy as accessed}
									<li class="text-xs font-light ml-4">{`${accessed.substring(0, 32)}...`}</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	{:else}
		<div class="w-full flex flex-col items-center px-2">
			{#each $proxies as proxy}
				<div class="collapse collapse-arrow bg-gray-200 m-1">
					<input type="checkbox" />
					<div
						class="collapse-title w-full flex flex-row px-6 py-2 bg-gray-200 rounded-md space-x-2 items-center"
					>
						<h1 class="text-xs mr-auto">{`${proxy.status}: ${proxy.uid.substring(0, 16)}...`}</h1>
					</div>
					<div class="collapse-content">
						<p class="text-sm font-light">
							Program: {proxy.program}
						</p>
						<div class="divider my-1" />
						<p class="text-sm font-light">Delegations:</p>
						<ul class="font-light list-disc">
							{#each proxy.delegations as delegation}
								<li class="text-xs font-light ml-4">
									{`${delegation.token}: ${delegation.amount}`}
								</li>
							{/each}
						</ul>
                        <button class="btn btn-secondary btn-xs mt-1">Change Delegations</button>
								<div class="divider my-1" />
                        <button class="btn btn-secondary btn-xs">Pause</button>
                        <button class="btn btn-secondary btn-xs">Stop</button>
                        <button class="btn btn-error btn-xs ">Remove</button>
								<div class="divider my-1" />
							{#if proxy.code}
								<p class="text-sm font-light">Code:</p>
								<textarea
									class="w-64 h-96 border border-gray-300 rounded-md
            p-4 my-4 text-sm"
									bind:value={proxy.code}
								/>
							{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
