<script>
  export let message = null;
  export let onMarkRead = () => {};
</script>

<div class="bg-white rounded-lg shadow p-6"
  class:bg-blue-50={!message?.isRead}
  class:border-blue-200={!message?.isRead}
>
  <div class="flex items-start justify-between">
    <div class="flex-1">
      <div class="flex items-center mb-2">
        <h3 class="text-lg font-semibold text-gray-900">{message?.name}</h3>
        <span class="ml-2 text-sm text-gray-500">{message?.email}</span>
        {#if message?.phone}
          <span class="ml-2 text-sm text-gray-500">• {message?.phone}</span>
        {/if}
        {#if !message?.isRead}
          <span class="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">New</span>
        {/if}
      </div>
      <h4 class="text-md font-medium text-gray-800 mb-3">{message?.subject}</h4>
      <p class="text-gray-700 leading-relaxed">{message?.message}</p>
    </div>
    <div class="ml-6 text-right">
      <p class="text-sm text-gray-500 mb-2">{new Date(message?.createdAt).toLocaleDateString()}</p>
      <div class="space-y-2">
        {#if !message?.isRead}
          <button
            on:click={() => onMarkRead(message?.id)}
            class="block text-sm text-primary-600 hover:text-primary-800"
          >
            Mark as Read
          </button>
        {/if}
        
        <a
          href="mailto:{message?.email}?subject=Re: {message?.subject}"
          class="block text-sm text-green-600 hover:text-green-800"
        >
          Reply via Email
        </a>
        {#if message?.phone}
          <a
            href="tel:{message?.phone}"
            class="block text-sm text-blue-600 hover:text-blue-800"
          >
            Call
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>