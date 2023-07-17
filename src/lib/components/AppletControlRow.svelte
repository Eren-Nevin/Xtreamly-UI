<script lang="ts">
	import type { AppStoreApp } from '$lib/ProxyAccount';
	export let app: AppStoreApp;

	export let selectedAppId: string;
</script>

<div
	class="w-full h-24 flex flex-row mx-2 px-2 items-center rounded-md opacity-75 space-x-2"
	on:click={() => {
		selectedAppId = app.id;
	}}
	on:keypress={() => {
		selectedAppId = app.id;
	}}
>
	<div class="w-16 h-16 bg-gray-100 rounded-2xl flex-shrink-0">
		<img src={app.logoUrl} alt="App Logo" />
	</div>
	<div class="w-full flex flex-col">
		<div class="w-full flex flex-row items-center">
			<div class="h-20 flex flex-auto flex-col my-2 justify-center mr-2">
				<span class="text-md text-black">{app.name}</span>
				<p class="text-xs text-gray-500">{app.shortDescription}</p>
				<div class="flex flex-row space-x-2 items-center mt-1">
					<div class="rating rating-sm">
						<input type="radio" name="rating-1" class="mask mask-star" />
						<input type="radio" name="rating-1" class="mask mask-star" />
						<input type="radio" name="rating-1" class="mask mask-star" />
						<input type="radio" name="rating-1" class="mask mask-star" />
						<input type="radio" name="rating-1" class="mask mask-star" checked />
					</div>
					<p class="text-xs text-gray-500">{app.rating}</p>
				</div>
			</div>
			<button
				class="btn btn-xs w-14 btn-primary rounded-2xl z-10"
				on:click|stopPropagation={() => {}}>Get</button
			>
		</div>

		<div class="h-[1px] w-full bg-gray-300" />
	</div>
</div>
