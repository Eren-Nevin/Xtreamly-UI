<script lang="ts">
	import type { ProxyAccount } from '$lib/ProxyAccount';
	export let proxy: ProxyAccount;

    export let selectedProxyId: string;
</script>

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
		<button class="btn btn-error btn-xs">Remove</button>
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
