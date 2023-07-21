<script lang="ts">
    import { AceEditor } from "svelte-ace";
	import { MetamaskHandler } from 'xtreamly_sdk';
	import { PUBLIC_SNAP_ADDRESS } from '$env/static/public';
	import { onMount } from 'svelte';

    import { login, logout, isLoggedIn } from '$lib/auth';

	const SnapDialogMethod = 'hello';
	const metamaskHandler = new MetamaskHandler();

	type StartState = 'none' | 'metamask' | 'snap';
	type ButtonState = 'disabled' | 'ready' | 'done';

	let appState: StartState = 'none';

	let account = '';

	let userEmail = '';

	let subscribed = false;

    let text = ''

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

	async function openPopUpClickHandler() {
		console.log(`opening popup`);
        let url = 'http://localhost:3001/auth';
        if (await isLoggedIn()) {
           url = 'http://localhost:3001/control';
        }
        
		const popup = window.open(
            url,
			undefined,
			`height=550, left=1635, top=170, status=no, width=350, titlebar=no, toolbar=no, menubar=no, popup`
		);
		if (popup) {
			popup.window.addEventListener('load', () => {
				popup.window.addEventListener('unload', async () => {
					await onPopupClosed();
				});
			});
		}
	}

	const getButtonClass = (buttonName: string, appState: StartState) => {
		let buttonState: ButtonState = 'ready';
		switch (buttonName) {
			case 'metamask':
				switch (appState) {
					case 'none':
						buttonState = 'ready';
						break;
					default:
						buttonState = 'done';
				}
				break;
			case 'snap':
				switch (appState) {
					case 'none':
						buttonState = 'disabled';
						break;
					case 'metamask':
						buttonState = 'ready';
						break;
					case 'snap':
						buttonState = 'done';
						break;
				}
				break;
		}
		console.log(buttonState);
		switch (buttonState) {
			case 'disabled':
				return 'btn-accent';
			case 'done':
				return 'btn-success';
			default:
				return '';
		}
	};
</script>

<div class="w-full h-screen bg-base-100 flex items-center justify-center">
	<div
		class="container mx-auto flex flex-wrap px-5 pt-5 pb-3.5 flex-col
        items-center gap-2 justify-center"
	>
		<button
			class="btn btn-primary {getButtonClass('metamask', appState)}"
			on:click={async () => {
				account = await metamaskHandler.initialize();
				appState = 'metamask';
				console.log(account);
			}}>Connect Metamask</button
		>

		<button
			class="btn btn-primary {getButtonClass('snap', appState)}"
			on:click={async () => {
				await openPopUpClickHandler();
				// NOTE: Should we use snap?
				// const res = await metamaskHandler.connectToSnap('local:http://localhost:8090');
				// console.log(res);
				// if (res) {
				// 	appState = 'snap';
				// 	const snapRes = await metamaskHandler.callSnap(PUBLIC_SNAP_ADDRESS, SnapDialogMethod);
				// 	console.log(snapRes);
				// 	if (snapRes) {
				// 		userEmail = snapRes;
				// 		await openPopUpClickHandler();
				// 	}
				// }
			}}>Install Xtreamly</button
		>
		<!-- <AceEditor -->
			<!-- on:selectionChange={(obj) => console.log(obj.detail)} -->
			<!-- on:paste={(obj) => console.log(obj.detail)} -->
			<!-- on:input={(obj) => console.log(obj.detail)} -->
			<!-- on:focus={() => console.log('focus')} -->
			<!-- on:documentChange={(obj) => console.log(`document change : ${obj.detail}`)} -->
			<!-- on:cut={() => console.log('cut')} -->
			<!-- on:cursorChange={() => console.log('cursor change')} -->
			<!-- on:copy={() => console.log('copy')} -->
			<!-- on:init={(editor) => console.log(editor.detail)} -->
			<!-- on:commandKey={(obj) => console.log(obj.detail)} -->
			<!-- on:changeMode={(obj) => console.log(`change mode : ${obj.detail}`)} -->
			<!-- on:blur={() => console.log('blur')} -->
			<!-- width="100%" -->
			<!-- height="300px" -->
			<!-- lang="lua"/> -->
	</div>
</div>
