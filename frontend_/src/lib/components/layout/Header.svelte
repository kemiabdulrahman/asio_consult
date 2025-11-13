<script>
  export let title = '';
  export let description = '';
  export let adminName = 'Admin';
  export let onLogout = () => {};
  
  let showUserMenu = false;
</script>

<div class="bg-white shadow-sm sticky top-0 z-40">
  <div class="flex items-center justify-between px-6 py-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">{title}</h1>
      {#if description}
        <p class="text-gray-600 text-sm mt-1">{description}</p>
      {/if}
    </div>

    <div class="flex items-center space-x-4">
      <!-- Notifications (future enhancement) -->
      <button class="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
        <span class="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">0</span>
      </button>

      <!-- User Menu -->
      <div class="relative">
        <button
          on:click={() => showUserMenu = !showUserMenu}
          class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <span class="text-sm font-medium text-gray-700 hidden sm:inline">{adminName}</span>
          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>

        {#if showUserMenu}
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <a href="#profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile Settings
            </a>
            <a href="#help" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Help & Support
            </a>
            <hr class="my-2" />
            <button
              on:click={onLogout}
              class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Sign Out
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  :global(body) {
    @apply bg-gray-50;
  }
</style>