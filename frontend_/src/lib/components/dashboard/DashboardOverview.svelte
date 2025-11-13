<script>
  import StatsCard from './StatsCard.svelte';
  import RecentMessages from './RecentMessages.svelte';
  
  export let stats = null;
  export let messages = [];
  export let loading = false;
  export let onMarkMessageRead = () => {};
</script>

<div>
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
    <p class="text-gray-600">Welcome to the ASIO CONSULT admin dashboard</p>
  </div>

  {#if loading}
    <div class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
    </div>
  {:else if stats}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Products"
        value={stats.products}
        color="blue"
      />
      <StatsCard
        title="Services"
        value={stats.services}
        color="green"
      />
      <StatsCard
        title="Messages"
        value={stats.messages}
        color="purple"
      />
      <StatsCard
        title="Orders"
        value={stats.orders || 0}
        color="yellow"
      />
    </div>

    {#if stats.unreadMessages > 0}
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <p class="text-blue-800">
          <strong>You have {stats.unreadMessages} unread messages</strong>
        </p>
      </div>
    {/if}

    {#if stats.pendingOrders > 0}
      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
        <p class="text-yellow-800">
          <strong>You have {stats.pendingOrders} pending orders</strong>
        </p>
      </div>
    {/if}

    <RecentMessages
      {messages}
      onMarkRead={onMarkMessageRead}
    />
  {/if}
</div>