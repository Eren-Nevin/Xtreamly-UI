<script lang="ts">
	import SubscriptionHeader from '$lib/components/popup/subscriptionHeader.svelte';
	import { EVMHandlerV5, ContractType } from 'xtreamly_sdk';
	import type { PageData } from './$types';

	export let data: PageData;

	import { getContext, onMount } from 'svelte';
	import { sendTransaction } from '$lib/chain';
	// import type { Writable } from 'svelte/store';
	// import { ProxyAccount, type AuthData, DApp } from '$lib/ProxyAccount';
	//
	// const dapps = getContext<Writable<DApp[]>>('dapps');
	//
	// const proxies = getContext<Writable<ProxyAccount[]>>('proxies');
	// const authDatas = getContext<Writable<AuthData[]>>('authDatas');

	const { dappName, dappAddress, generatedAccount } = data;

	let subscribed = false;

	onMount(async () => {
		window.onmessage = async function (e) {
			if (e.data.subscribed) {
				console.log(`Subscribed`);
				subscribed = true;
			}
		};
	});

	async function onPopupClosed() {
		console.log('Popup Closed');
	}

	async function subscribeClickHandler(amount: number) {
		const popup = window.open(
			`http://localhost:3000/popup/install?amount=${amount}`,
			undefined,
			`height=550, left=1635, top=170, status=no, width=350, titlebar=no, toolbar=no, menubar=no, popup 
                                `
		);
		if (popup) {
			popup.window.addEventListener('load', () => {
				popup.window.addEventListener('unload', async () => {
					await onPopupClosed();
				});
			});
		}
	}
</script>

<div class="w-full h-screen flex flex-col m-auto items-center justify-center">
	<div
		class="bg-gray-50 flex flex-col p-8 rounded-md border-gray-400 border-2 shadow-2xl shadow-gray-600 z-20"
	>
		<SubscriptionHeader {generatedAccount} />
		<div class="flex flex-wrap justify-center -m-4">
			<div class="p-4 w-1/2">
				<div
					class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden"
				>
					<span
						class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl"
						>POPULAR</span
					>
					<h2 class="text-sm tracking-widest title-font mb-1 font-medium">PRO</h2>
					<h1
						class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200"
					>
						<span>$38</span>
						<span class="text-lg ml-1 font-normal text-gray-500">/mo</span>
					</h1>
					<p class="flex items-center text-gray-600 mb-2">
						<span
							class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"
						>
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								class="w-3 h-3"
								viewBox="0 0 24 24"
							>
								<path d="M20 6L9 17l-5-5" />
							</svg>
						</span>All features in free version
					</p>
					<p class="flex items-center text-gray-600 mb-2">
						<span
							class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"
						>
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								class="w-3 h-3"
								viewBox="0 0 24 24"
							>
								<path d="M20 6L9 17l-5-5" />
							</svg>
						</span>Access all material
					</p>
					<p class="flex items-center text-gray-600 mb-2">
						<span
							class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"
						>
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								class="w-3 h-3"
								viewBox="0 0 24 24"
							>
								<path d="M20 6L9 17l-5-5" />
							</svg>
						</span>Access audio material
					</p>
					<p class="flex items-center text-gray-600 mb-6">
						<span
							class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"
						>
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								class="w-3 h-3"
								viewBox="0 0 24 24"
							>
								<path d="M20 6L9 17l-5-5" />
							</svg>
						</span>Mobile app (iOS, Android)
					</p>
					<button
						on:click={async () => {
							await subscribeClickHandler(38);
						}}
						class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"
						>Subscribe
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							class="w-4 h-4 ml-auto"
							viewBox="0 0 24 24"
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</button>
					<p class="text-xs text-gray-500 mt-3">* Prices are in USDT</p>
				</div>
			</div>
			<div class="p-4 w-1/2">
				<div
					class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden"
				>
					<h2 class="text-sm tracking-widest title-font mb-1 font-medium">MASTER</h2>
					<h1
						class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200"
					>
						<span>$56</span>
						<span class="text-lg ml-1 font-normal text-gray-500">/mo</span>
					</h1>
					<p class="flex items-center text-gray-600 mb-2">
						<span
							class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"
						>
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								class="w-3 h-3"
								viewBox="0 0 24 24"
							>
								<path d="M20 6L9 17l-5-5" />
							</svg>
						</span>Ability to save any content
					</p>
					<p class="flex items-center text-gray-600 mb-2">
						<span
							class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"
						>
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								class="w-3 h-3"
								viewBox="0 0 24 24"
							>
								<path d="M20 6L9 17l-5-5" />
							</svg>
						</span>Early access content
					</p>
					<p class="flex items-center text-gray-600 mb-2">
						<span
							class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"
						>
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								class="w-3 h-3"
								viewBox="0 0 24 24"
							>
								<path d="M20 6L9 17l-5-5" />
							</svg>
						</span>Sessions with writers
					</p>
					<p class="flex items-center text-gray-600 mb-2">
						<span
							class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"
						>
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								class="w-3 h-3"
								viewBox="0 0 24 24"
							>
								<path d="M20 6L9 17l-5-5" />
							</svg>
						</span>Priority support
					</p>
					<button
						on:click={async () => {
							await subscribeClickHandler(56);
						}}
						class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
						>Subscribe
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							class="w-4 h-4 ml-auto"
							viewBox="0 0 24 24"
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</button>
					<p class="text-xs text-gray-500 mt-3">* Prices are in USDT</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
