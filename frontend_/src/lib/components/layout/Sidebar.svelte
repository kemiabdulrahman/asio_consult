<script>
  export let activeTab = 'overview';
  export let messageCount = 0;
  export let onTabChange = () => {};
  export let onLogout = () => {};
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'products', label: 'Products', icon: 'products' },
    { id: 'services', label: 'Services', icon: 'services' },
    { id: 'messages', label: 'Messages', icon: 'messages' }
  ];
</script>

<div class="w-64 bg-white shadow-lg flex flex-col h-full">
  <div class="p-6 border-b">
    <h1 class="text-xl font-bold text-gray-900">ASIO CONSULT</h1>
    <p class="text-sm text-gray-600">Admin Dashboard</p>
  </div>
  
  <nav class="mt-6 flex-1">
    {#each tabs as tab (tab.id)}
      <button
        on:click={() => onTabChange(tab.id)}
        class="nav-item"
        class:active={activeTab === tab.id}
      >
        {#if tab.icon === 'dashboard'}
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        {:else if tab.icon === 'products'}
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        {:else if tab.icon === 'services'}
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        {:else if tab.icon === 'messages'}
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        {/if}
        
        {tab.label}
        
        {#if tab.id === 'messages' && messageCount > 0}
          <span class="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {messageCount}
          </span>
        {/if}
      </button>
    {/each}
  </nav>

  <div class="p-6 border-t">
    <button
      on:click={onLogout}
      class="flex items-center w-full text-gray-600 hover:text-red-600 transition-colors"
    >
      <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
      </svg>
      Sign Out
    </button>
  </div>
</div>

<style lang="postcss">
  .nav-item {
    @apply flex items-center w-full px-6 py-3 text-left text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors;
  }
  
  .nav-item.active {
    @apply bg-primary-50 text-primary-700 border-r-2 border-primary-700;
  }
</style>