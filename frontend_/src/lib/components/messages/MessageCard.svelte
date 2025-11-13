<script>
  export let message = null;
  export let onMarkRead = () => {};
  export let onDelete = () => {};
  
  let showActions = false;
</script>

<div class="bg-white rounded-lg shadow p-6 mb-4 hover:shadow-lg transition-shadow"
  class:bg-blue-50={!message?.isRead}
  class:border-l-4={!message?.isRead}
  class:border-l-blue-500={!message?.isRead}
>
  <div class="flex items-start justify-between">
    <div class="flex-1 min-w-0">
      <div class="flex items-center mb-3 flex-wrap gap-2">
        <h3 class="text-lg font-semibold text-gray-900">{message?.name}</h3>
        <span class="text-sm text-gray-500">&lt;{message?.email}&gt;</span>
        {#if message?.phone}
          <span class="text-sm text-gray-500">•</span>
          <span class="text-sm text-gray-500">{message?.phone}</span>
        {/if}
        {#if !message?.isRead}
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            New
          </span>
        {/if}
      </div>
      <h4 class="text-md font-medium text-gray-800 mb-3">{message?.subject}</h4>
      <p class="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">{message?.message}</p>
    </div>
    
    <button
      on:click={() => showActions = !showActions}
      class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
    </button>
  </div>

  <div class="mt-4 flex items-center justify-between">
    <p class="text-sm text-gray-500">
      {new Date(message?.createdAt).toLocaleDateString('en-NG', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </p>

    <div class="flex items-center space-x-3">
      {#if !message?.isRead}
        <button
          on:click={() => onMarkRead(message?.id)}
          class="text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors"
          title="Mark as read"
        >
          Mark as Read
        </button>
      {/if}
      
      <a
        href="mailto:{message?.email}?subject=Re: {message?.subject}"
        class="text-sm text-green-600 hover:text-green-800 font-medium transition-colors"
        title="Reply via email"
      >
        Reply
      </a>

      {#if message?.phone}
        <a
          href="tel:{message?.phone}"
          class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          title="Call customer"
        >
          Call
        </a>
      {/if}

      {#if showActions}
        <button
          on:click={() => onDelete(message?.id)}
          class="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
          title="Delete message"
        >
          Delete
        </button>
      {/if}
    </div>
  </div>
</div>