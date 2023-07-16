<script lang="ts">
	import type { AppStoreApp } from '$lib/ProxyAccount';
	import logo from '$lib/assets/download.svg';
    export let app: AppStoreApp
</script>

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
