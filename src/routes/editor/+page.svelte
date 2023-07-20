<script lang="ts">
	import CodeEditor from '$lib/components/Editor/CodeEditor.svelte';
</script>

<div class="w-full flex flex-col items-center justify-center">
	<div class="w-9/12 border border-gray-400 rounded-xl p-9">
		<CodeEditor />
		<div class="flex flex-row justify-end my-2">
			<button class="btn btn-primary btn-sm"> Install </button>
		</div>
	</div>

	<!-- <button -->
	<!-- 	class="h-6 text-blue-700 text-sm ms-auto font-light normal-case p-0" -->
	<!-- 	onclick="my_modal_3.showModal()">Show Code</button -->
	<!-- > -->
	<!-- <dialog id="my_modal_3" class="modal"> -->
	<!-- 	<form method="dialog" class="modal-box"> -->
	<!-- 		<button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button> -->
	<!-- 		<h3 class="font-bold text-lg">Code</h3> -->
	<!-- 		<CodeEditor /> -->
	<!-- 	</form> -->
	<!-- </dialog> -->
</div>
