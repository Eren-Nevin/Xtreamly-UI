<script lang="ts">
	import CodeEditor from '$lib/components/Editor/CodeEditor.svelte';

	let code = '';
</script>

<div class="w-full flex flex-col items-center justify-center">
	<div class="w-9/12 border border-gray-400 rounded-xl p-9">
		<CodeEditor bind:text={code} />
		<div class="flex flex-row justify-end my-2 gap-2">
			<button
				class="btn btn-primary btn-sm"
				on:click={() => {
					code = '';
					window.postMessage(code, 'http://localhost:3001/control');
                    window.close()
				}}
			>
				Cancel
			</button>
			<button
				class="btn btn-primary btn-sm"
				on:click={() => {
					console.log(code);
					window.postMessage(code, 'http://localhost:3001/control');
                    window.close()
				}}
			>
				Save
			</button>
		</div>
	</div>

</div>
