<script>
  import { onMount } from 'svelte';
  import { orderAPI, handleAPIError } from '../../lib/api.js';
  import { toast } from '../../lib/stores.js';

  let orders = [];
  let isLoading = true;
  let filterStatus = 'all';

  onMount(async () => {
    await fetchOrders();
  });

  async function fetchOrders() {
    isLoading = true;
    try {
      const response = await orderAPI.getAll();
      orders = response.data.data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      const apiError = handleAPIError(error);
      toast.add('Error loading orders: ' + apiError.message, 'error', 3000);
      orders = [];
    } finally {
      isLoading = false;
    }
  }

  function getFilteredOrders() {
    if (filterStatus === 'all') {
      return orders;
    }
    // Fixed: Use orderStatus instead of status, and uppercase enum values
    return orders.filter(order => order.orderStatus === filterStatus);
  }

  function getStatusBadgeClass(status) {
    // Fixed: Use uppercase enum values to match backend
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'PROCESSING':
        return 'bg-purple-100 text-purple-800';
      case 'SHIPPED':
        return 'bg-indigo-100 text-indigo-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function getItemCount(items) {
    if (Array.isArray(items)) {
      return items.reduce((total, item) => total + (item.quantity || 1), 0);
    }
    return 0;
  }

</script>

<svelte:head>
  <title>Order History - ASIO CONSULT</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
      <p class="text-gray-600">View and track all your orders</p>
    </div>

    <!-- Filter Buttons -->
    <div class="mb-6 flex gap-2 flex-wrap">
      <button
        on:click={() => filterStatus = 'all'}
        class="px-4 py-2 rounded-lg font-medium transition-colors"
        class:bg-primary-600={filterStatus === 'all'}
        class:text-white={filterStatus === 'all'}
        class:bg-white={filterStatus !== 'all'}
        class:text-gray-700={filterStatus !== 'all'}
        class:border={filterStatus !== 'all'}
        class:border-gray-300={filterStatus !== 'all'}
      >
        All Orders ({orders.length})
      </button>
      <button
        on:click={() => filterStatus = 'PENDING'}
        class="px-4 py-2 rounded-lg font-medium transition-colors"
        class:bg-yellow-100={filterStatus === 'PENDING'}
        class:text-yellow-800={filterStatus === 'PENDING'}
        class:bg-white={filterStatus !== 'PENDING'}
        class:text-gray-700={filterStatus !== 'PENDING'}
        class:border={filterStatus !== 'PENDING'}
        class:border-gray-300={filterStatus !== 'PENDING'}
      >
        Pending ({orders.filter(o => o.orderStatus === 'PENDING').length})
      </button>
      <button
        on:click={() => filterStatus = 'CONFIRMED'}
        class="px-4 py-2 rounded-lg font-medium transition-colors"
        class:bg-blue-100={filterStatus === 'CONFIRMED'}
        class:text-blue-800={filterStatus === 'CONFIRMED'}
        class:bg-white={filterStatus !== 'CONFIRMED'}
        class:text-gray-700={filterStatus !== 'CONFIRMED'}
        class:border={filterStatus !== 'CONFIRMED'}
        class:border-gray-300={filterStatus !== 'CONFIRMED'}
      >
        Confirmed ({orders.filter(o => o.orderStatus === 'CONFIRMED').length})
      </button>
      <button
        on:click={() => filterStatus = 'SHIPPED'}
        class="px-4 py-2 rounded-lg font-medium transition-colors"
        class:bg-indigo-100={filterStatus === 'SHIPPED'}
        class:text-indigo-800={filterStatus === 'SHIPPED'}
        class:bg-white={filterStatus !== 'SHIPPED'}
        class:text-gray-700={filterStatus !== 'SHIPPED'}
        class:border={filterStatus !== 'SHIPPED'}
        class:border-gray-300={filterStatus !== 'SHIPPED'}
      >
        Shipped ({orders.filter(o => o.orderStatus === 'SHIPPED').length})
      </button>
      <button
        on:click={() => filterStatus = 'DELIVERED'}
        class="px-4 py-2 rounded-lg font-medium transition-colors"
        class:bg-green-100={filterStatus === 'DELIVERED'}
        class:text-green-800={filterStatus === 'DELIVERED'}
        class:bg-white={filterStatus !== 'DELIVERED'}
        class:text-gray-700={filterStatus !== 'DELIVERED'}
        class:border={filterStatus !== 'DELIVERED'}
        class:border-gray-300={filterStatus !== 'DELIVERED'}
      >
        Delivered ({orders.filter(o => o.orderStatus === 'DELIVERED').length})
      </button>
    </div>

    <!-- Loading State -->
    {#if isLoading}
      <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    {:else if getFilteredOrders().length === 0}
      <!-- Empty State -->
      <div class="bg-white rounded-lg shadow-md p-12 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <p class="text-gray-600 text-lg mb-4">No orders found</p>
        <a href="/shop" class="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          Continue Shopping
        </a>
      </div>
    {:else}
      <!-- Orders List -->
      <div class="space-y-4">
        {#each getFilteredOrders() as order (order.id)}
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="p-6">
            <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Order #{order.orderNumber}</h3>
                  <p class="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                </div>
                <span class="px-3 py-1 rounded-full text-sm font-medium {getStatusBadgeClass(order.orderStatus)}">
                  {order.orderStatus}
                </span>
              </div>

              <!-- Customer Info -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">Customer Name</p>
                  <p class="text-gray-900 font-medium">{order.customerName}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                  <p class="text-gray-900 font-medium">{order.customerEmail}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                  <p class="text-gray-900 font-medium">{order.customerPhone}</p>
                </div>
              </div>

              <!-- Items -->
              <div class="mb-4">
                <h4 class="text-sm font-semibold text-gray-700 mb-3">Items ({getItemCount(order.items)})</h4>
                <div class="space-y-2 max-h-32 overflow-y-auto">
                  {#if Array.isArray(order.items)}
                    {#each order.items as item}
                      <div class="flex justify-between text-sm">
                        <div class="flex items-center gap-2">
                          {#if item.image}
                            <img 
                              src={item.image} 
                              alt={item.name}
                              class="w-8 h-8 object-cover rounded"
                            />
                          {/if}
                          <div>
                            <p class="text-gray-900 font-medium">{item.name}</p>
                            <p class="text-gray-600 text-xs">Qty: {item.quantity || 1}</p>
                          </div>
                        </div>
                        <p class="text-gray-900 font-medium">₦{((item.price * (item.quantity || 1)) / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      </div>
                    {/each}
                  {:else}
                    <p class="text-gray-600 text-sm">No items in this order</p>
                  {/if}
                </div>
              </div>

              <!-- Order Total -->
              <div class="flex justify-end items-center gap-8 pt-4 border-t border-gray-200">
                <div>
                  <p class="text-sm text-gray-600 mb-1">Order Total</p>
                  <p class="text-2xl font-bold text-primary-600">₦{(order.total / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
</style>
