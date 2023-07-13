<script lang="ts">
    export let pageTitle: string;
</script>

<div
    class="w-full flex flex-col justify-center 
    bg-gradient-to-b from-slate-900 to-gray-900
    "
>
    <section class="text-gray-200 body-font">
        <div class="container px-5 py-12 mx-auto">
               <slot/> 
        </div>
    </section>
</div>
