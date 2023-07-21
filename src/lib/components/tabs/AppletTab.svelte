<script lang="ts">
	import { Applet, AppletVisibility } from '$lib/models';
	import type { Writable } from 'svelte/store';
	import AppletControlRow from '../AppletControlRow.svelte';
	import AppletDetail from '../AppStoreTab/AppletDetail.svelte';
	import { getContext } from 'svelte';
	import { BackendHandler } from '$lib/backend';
	import { getAuthToken } from '$lib/auth';

	import { publishApplet, getAllApplets, getMyApplets } from '$lib/applets';

	const applets = getContext<Writable<Applet[]>>('applets');
	const allApplets = getContext<Writable<Applet[]>>('allApplets');

	let selectedAppId = '';
	let onlyShowMyApplets = false;

	const backendHandler = new BackendHandler(getAuthToken() ?? '');

	const refreshAppletList = async () => {
		const receivedAllApplets = await getAllApplets(backendHandler);
		allApplets.set(receivedAllApplets);
		const receivedMyApplets = await getMyApplets(backendHandler);
		applets.set(receivedMyApplets);
	};
</script>

<div class="w-full flex flex-col items-center px-2">
	{#if selectedAppId}
		<AppletDetail bind:selectedAppId />
	{:else}
		<div class="w-full flex flex-row items-center gap-1">
			<label class="mr-auto label cursor-pointer flex flex-row space-x-2">
				<span class="label-text font-light">{onlyShowMyApplets ? 'My Applets' : 'All Applets'}</span
				>
				<input type="checkbox" class="toggle" bind:checked={onlyShowMyApplets} />
			</label>
			<button
				class="btn btn-primary btn-sm"
				on:click={async () => {
					const newApplet = await publishApplet(
						backendHandler,
						'Best Applet',
						'a = 3;',
						'Some Developer',
						'https://google.com',
						'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/EmacsIcon.svg/1024px-EmacsIcon.svg.png',
						'desc',
						'short_desc',
						'4.3',
						'no_updates',
						'install_notes_here',
						'uninstall_notes_here',
						AppletVisibility.PRIVATE
					);

					await refreshAppletList();
				}}>Add</button
			>
			<button
				class="btn btn-primary btn-sm"
				on:click={async () => {
					await refreshAppletList();
				}}>Refresh</button
			>
		</div>
		<div class="w-full flex flex-col">
			{#if onlyShowMyApplets}
				{#each $applets as applet}
					<AppletControlRow app={applet} bind:selectedAppId />
				{/each}
			{:else}
				{#each $allApplets as applet}
					<AppletControlRow app={applet} bind:selectedAppId />
				{/each}
			{/if}
		</div>
	{/if}
</div>
