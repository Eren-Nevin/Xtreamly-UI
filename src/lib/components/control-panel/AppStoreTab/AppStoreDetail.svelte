<script lang="ts">
	import { Icon } from 'svelte-awesome';
	import beer from 'svelte-awesome/icons/beer';
	import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
	import { faChevronLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';

	export let selectedAppId: string;
</script>

<div class="w-full flex flex-col items-center bg-gray-100">
	<div class="w-full flex flex-row justify-start my-4">
		<button class="btn btn-xs text-blue-400">
			<Icon data={faChevronLeft} />
			Back
		</button>
	</div>
	<div class="w-full flex flex-row justify-start">
		<div class="w-24 h-24 bg-gray-700 rounded-2xl flex-shrink-0" />
		<div class="flex flex-col mx-2 w-full">
			<span class="text-lg"> App Name </span>
			<span class="text-xs font-light text-gray-400"> Company Name </span>
			<div class="flex flex-row mt-auto w-full">
				<button class="btn btn-xs w-16 btn-primary rounded-2xl"> Get </button>
				<button class="btn btn-xs w-6 btn-primary btn-circle ml-auto">
					<Icon data={faEllipsis} />
				</button>
			</div>
		</div>
	</div>
	<div class="w-full flex flex-row justify-start items-center gap-1 my-4">
        <span class="text-sm text-gray-500"> 4.3 </span>
		<div class="rating rating-sm">
			<input type="radio" class="mask mask-star-2 bg-gray-500" disabled />
			<input type="radio" class="mask mask-star-2 bg-gray-500" disabled />
			<input type="radio" class="mask mask-star-2 bg-gray-500" disabled />
			<input type="radio" class="mask mask-star-2 bg-gray-500" checked />
			<input type="radio" class="mask mask-star-2 bg-gray-500" disabled />
		</div>
	</div>
    <div class="h-[1px] w-full my-4 bg-gray-300"/>
</div>
