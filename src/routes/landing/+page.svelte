<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import { EVMHandlerV5, ContractType } from 'xtreamly_sdk';


	const didPlaceholder = 'Enter a did that tells us more about you';
	const proxyAccountPlaceholder = 'If empty, a new proxy account would be generated';

	const successfulLoginModalMessage =
		"We've confirmed you're over 18 and live in supported countries. ";

	const addressNote =
		"We couldn't access your address. By providing your location you can get more personalized deals.";

	onMount(async () => {
		window.onmessage = function (e) {
			if (e.data.signedUp) {
				console.log(`Signed Up In Popup`);
				signedup = true;
			}
		};
	});

	async function onPopupClosed() {
		console.log('Popup Closed');
	}

	let signedup = false;

	async function signupButtonHandler(amount: number) {
		// showModal = true;
		const popup = window.open(
			`http://localhost:3000/popup/signup`,
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

<div class="flex flex-col m-auto items-center justify-center w-full h-screen">
	<div class="flex flex-row justify-center">
		<div
			class="bg-gray-50 flex flex-col md:ml-auto md:py-8 mt-8 md:mt-0 p-4 rounded-md border-gray-400 border-2 shadow-2xl shadow-gray-600 z-20"
		>
			<div class="relative mb-4 w-96 flex flex-col items-start">
				<div class="w-full flex flex-row justify-center">
					{#if !signedup}
						<h1 class="text-4xl text-center py-4">Welcome to Axie!</h1>
					{:else}
						<h1 class="text-4xl text-center py-4">Successful Signup</h1>
					{/if}
				</div>
			</div>
			{#if !signedup}
				<Button title="Connect Metamask" addClass="bg-green-700" handler={signupButtonHandler} />
				<!-- <Button -->
				<!-- 	title="Control Panel" -->
				<!-- 	addClass="bg-green-700" -->
				<!-- 	handler={() => { -->
				<!-- 		const popup = window.open( -->
				<!-- 			`http://localhost:3000/popup/control`, -->
				<!-- 			undefined, -->
				<!-- 			`height=550, left=1635, top=170, status=no, width=350, titlebar=no, toolbar=no, menubar=no, popup  -->
    <!--                             ` -->
				<!-- 		); -->
				<!-- 		if (popup) { -->
				<!-- 			popup.window.addEventListener('load', () => { -->
				<!-- 				popup.window.addEventListener('unload', async () => { -->
				<!-- 					await onPopupClosed(); -->
				<!-- 				}); -->
				<!-- 			}); -->
				<!-- 		} -->
				<!-- 	}} -->
				<!-- /> -->
			{/if}
			{#if signedup}
				<Button
					title="Go To Subscription"
					addClass="bg-green-700"
					handler={() => {
						goto('./axie/sub');
					}}
				/>
			{/if}
		</div>
	</div>
</div>

<style>
</style>
