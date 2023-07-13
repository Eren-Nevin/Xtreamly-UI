<script lang="ts">
    export let title;
    export let handler;
    export let y = "2";
    export let x = "4";
    export let my = "2";
    export let mx = "2";
    export let addClass = "";

    let buttonClass = `flex justify-center text-white text-center bg-indigo-500 border-0 py-${y} px-${x} my-${my} mx-${mx} text-md focus:outline-none hover:bg-indigo-600 rounded text-md ${addClass}`;
</script>

<button class={buttonClass} on:click={handler}>
    {title}
</button>
