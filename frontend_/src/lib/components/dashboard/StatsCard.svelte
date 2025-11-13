<script>
  export let title = '';
  export let value = 0;
  export let color = 'blue'; // blue, green, purple, yellow
  export let icon = null;
</script>

<div class="bg-white rounded-lg shadow p-6">
  <div class="flex items-center">
    <div class="rounded-lg p-3 mr-4"
      class:bg-blue-100={color === 'blue'}
      class:bg-green-100={color === 'green'}
      class:bg-purple-100={color === 'purple'}
      class:bg-yellow-100={color === 'yellow'}
    >
      {#if icon}
        <svelte:component 
          this={icon}
          class="w-8 h-8"
          class:text-blue-600={color === 'blue'}
          class:text-green-600={color === 'green'}
          class:text-purple-600={color === 'purple'}
          class:text-yellow-600={color === 'yellow'}
        />
      {/if}
    </div>
    <div>
      <h3 class="text-2xl font-bold text-gray-900">{value}</h3>
      <p class="text-gray-600">{title}</p>
    </div>
  </div>
</div>

<style lang="postcss">
  div {
    @apply card;
  }
</style>