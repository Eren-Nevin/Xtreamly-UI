<script lang="ts">
	import type { ProxyAccount } from '$lib/ProxyAccount';
	import type { Writable } from 'svelte/store';
	import ProxyControlRow from '../ProxyControlRow.svelte';

	export let proxies: Writable<ProxyAccount[]>;
</script>

<div class="w-full flex flex-col items-center px-2">
	{#each $proxies as proxy}
		<ProxyControlRow bind:proxy />
	{/each}
</div>
