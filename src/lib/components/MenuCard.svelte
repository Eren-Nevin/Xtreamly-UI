<script lang="ts">
    export let link;
    export let categoryTitle;

    export let title;
    export let description;
    export let imgSrc;
    export let buttonText;
</script>

<div class="p-4 md:w-1/2">
    <div
        class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden
        bg-gray-900/75

        "
    >
        <img
            class="lg:h-56 md:h-36 w-full object-cover object-center"
            src={imgSrc}
            alt="blog"
        />
        <div class="p-6">
            <h2
                class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
            >
                {categoryTitle}
            </h2>
            <h1 class="title-font text-lg font-medium text-gray-200 mb-3">
                {title}
            </h1>
            <p class="leading-relaxed mb-3">{description}</p>
            <div class="flex items-center flex-wrap justify-center">
                <button
                    class="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-md mg-auto"
                    on:click={async () => {}}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    </div>
</div>
