<script>
  import { toast } from '../../../lib/stores.js';
  import { serviceAPI, handleAPIError } from '../../../lib/api.js';
  
  export let services = [];
  export let loading = false;
  export let onEdit = () => {};
  export let onRefresh = () => {};

  let searchQuery = '';

  $: filteredServices = services.filter(s => 
    searchQuery === '' ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function handleDelete(serviceId) {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await serviceAPI.delete(serviceId);
      await onRefresh();
      toast.add('Service deleted successfully', 'success');
    } catch (error) {
      const apiError = handleAPIError(error);
      toast.add(apiError.message, 'error');
    }
  }

  async function handleToggleActive(service) {
    try {
      const action = service.isActive ? 'deactivate' : 'activate';
      if (service.isActive) {
        await serviceAPI.deactivate(service.id);
      } else {
        await serviceAPI.activate(service.id);
      }
      await onRefresh();
      toast.add(`Service ${action}d successfully`, 'success');
    } catch (error) {
      const apiError = handleAPIError(error);
      toast.add(apiError.message, 'error');
    }
  }

  function formatPrice(price) {
    if (!price) return 'Custom';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  }
</script>

<div class="bg-white rounded-lg shadow">
  <!-- Header with search -->
  <div class="p-6 border-b">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h3 class="text-lg font-semibold text-gray-900">Services List</h3>
      
      <div class="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search services..."
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        />

        <button
          on:click={onRefresh}
          disabled={loading}
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors text-sm font-medium"
        >
          {#if loading}
            <svg class="animate-spin h-4 w-4 inline mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            </svg>
          {/if}
          Refresh
        </button>
      </div>
    </div>
  </div>

  <!-- Table -->
  {#if loading}
    <div class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  {:else if filteredServices.length === 0}
    <div class="p-12 text-center">
      <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
      </svg>
      <p class="text-gray-500">
        {#if searchQuery}
          No services found matching your search
        {:else}
          No services yet
        {/if}
      </p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-3 text-left font-semibold text-gray-900">Service</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-900">Category</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-900">Price</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-900">Duration</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          {#each filteredServices as service (service.id)}
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div>
                  <p class="font-medium text-gray-900">{service.name}</p>
                  <p class="text-xs text-gray-500 line-clamp-2">{service.description}</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize">
                  {service.category.toLowerCase()}
                </span>
              </td>
              <td class="px-6 py-4 font-medium text-gray-900">
                {formatPrice(service.price)}
              </td>
              <td class="px-6 py-4 text-gray-700">
                {service.duration || '-'}
              </td>
              <td class="px-6 py-4">
                <button
                  on:click={() => handleToggleActive(service)}
                  class="inline-block px-3 py-1 text-xs font-medium rounded-full transition-colors"
                  class:bg-green-100={service.isActive}
                  class:text-green-800={service.isActive}
                  class:bg-gray-100={!service.isActive}
                  class:text-gray-800={!service.isActive}
                  title="Click to toggle"
                >
                  {service.isActive ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button
                    on:click={() => onEdit(service)}
                    class="text-primary-600 hover:text-primary-900 font-medium text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    on:click={() => handleDelete(service.id)}
                    class="text-red-600 hover:text-red-900 font-medium text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="px-6 py-4 border-t bg-gray-50 text-sm text-gray-600">
      Showing {filteredServices.length} of {services.length} services
    </div>
  {/if}
</div>