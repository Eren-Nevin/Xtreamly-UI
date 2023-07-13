<script lang="ts">
    import NavItem from "./NavItem.svelte";

    export let companyName = "Xtreamly Control Panel";
</script>

<header class="bg-gray-800 text-gray-600 body-font">
    <div
        class="container mx-auto flex flex-wrap px-5 pt-5 pb-3.5 flex-col md:flex-row items-center"
    >
        <a
        href="./"
            class="flex title-font font-medium items-center text-gray-300 mb-4 md:mb-0"
        >
            <img class="w-8 h-8" src="./xtreamly_logo.png" />
            <span class="ml-3 text-xl">{companyName}</span>
        </a>
    </div>
</header>
