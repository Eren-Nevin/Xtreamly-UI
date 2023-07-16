<script lang="ts">
    export let activeTab: string
</script>
<div class="w-full tabs">
	<a
		class="tab w-1/3 tab-bordered {activeTab === 'Proxies' ? 'tab-active' : ''}"
		on:click={() => {
			activeTab = 'Proxies';
		}}>Proxies</a
	>
	<a
		class="tab w-1/3 tab-bordered {activeTab === 'Data' ? 'tab-active' : ''}"
		on:click={() => {
			activeTab = 'Data';
		}}>Data</a
	>
	<a
		class="tab w-1/3 tab-bordered {activeTab === 'App Store' ? 'tab-active' : ''}"
		on:click={() => {
			activeTab = 'App Store';
		}}>Applets</a
	>
</div>
