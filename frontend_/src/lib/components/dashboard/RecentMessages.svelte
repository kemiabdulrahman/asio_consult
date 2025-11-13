<script>
  export let messages = [];
  export let onMarkRead = () => {};
</script>

<div class="bg-white rounded-lg shadow p-6">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
  
  {#if messages && messages.length > 0}
    <div class="space-y-4">
      {#each messages.slice(0, 5) as message (message.id)}
        <div class="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          class:bg-blue-50={!message.isRead}
          class:hover:bg-blue-100={!message.isRead}
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center mb-2 flex-wrap gap-2">
              <h4 class="font-medium text-gray-900 truncate">{message.name}</h4>
              <span class="text-sm text-gray-500 truncate">{message.email}</span>
              {#if !message.isRead}
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  New
                </span>
              {/if}
            </div>
            <p class="text-gray-700 font-medium text-sm mb-1">{message.subject}</p>
            <p class="text-gray-600 text-sm truncate">{message.message.substring(0, 80)}...</p>
          </div>
          <div class="ml-4 flex-shrink-0 text-right">
            <p class="text-xs text-gray-500 whitespace-nowrap">
              {new Date(message.createdAt).toLocaleDateString()}
            </p>
            {#if !message.isRead}
              <button
                on:click={() => onMarkRead(message.id)}
                class="text-xs text-primary-600 hover:text-primary-800 mt-2 font-medium"
              >
                Mark as Read
              </button>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="text-center py-8">
      <svg class="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
      <p class="text-gray-500">No messages yet</p>
    </div>
  {/if}
</div>