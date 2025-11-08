<script>
  import { toast } from '../lib/stores.js';
</script>

{#if $toast.length > 0}
  <div class="fixed top-4 right-4 z-50 space-y-2">
    {#each $toast as { id, message, type }}
      <div 
        class="px-4 py-3 rounded-lg shadow-lg max-w-sm transform transition-all duration-300"
        class:bg-green-500={type === 'success'}
        class:bg-red-500={type === 'error'}
        class:bg-blue-500={type === 'info'}
        class:bg-yellow-500={type === 'warning'}
        class:text-white={true}
      >
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium">{message}</p>
          <button 
            on:click={() => toast.remove(id)}
            class="ml-4 text-white hover:text-gray-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    {/each}
  </div>
{/if}