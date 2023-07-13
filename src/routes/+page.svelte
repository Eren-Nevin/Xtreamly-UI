<script lang="ts">
	import { MetamaskHandler } from 'xtreamly_sdk';
	const metamaskHandler = new MetamaskHandler();

	let connectedToMetamask = false;
	let account = '';
</script>

<div class="w-full h-screen bg-base-100 flex items-center justify-center">
	<div
		class="container mx-auto flex flex-wrap px-5 pt-5 pb-3.5 flex-col
        items-center gap-2 justify-center"
	>
		<button
			class="btn btn-primary"
			on:click={async () => {
				account = await metamaskHandler.initialize();
				connectedToMetamask = true;
				console.log(account);
			}}>Connect</button
		>

		<button
			class="btn btn-primary {!connectedToMetamask ? 'btn-disabled btn-accent' : ''}"
			on:click={async () => {
				const res = await metamaskHandler.getCurrentSnaps();
				console.log(res);
			}}>Get Current Snaps</button
		>

		<button
			class="btn btn-primary {!connectedToMetamask ? 'btn-disabled btn-accent' : ''}"
			on:click={async () => {
				const res = await metamaskHandler.connectToSnap('local:http://localhost:8090');
				console.log(res);
			}}>Connect to Snap</button
		>

		<button
			class="btn btn-primary {!connectedToMetamask ? 'btn-disabled btn-accent': ''}"
			on:click={async () => {
				const res = await metamaskHandler.callSnap();
				console.log(res);
			}}>Call Snap</button
		>
	</div>
</div>
