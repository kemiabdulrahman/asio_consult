<script>
  import { toast } from '../../stores.js';
  import { productAPI, handleAPIError } from '../../../lib/api.js';
  
  export let products = [];
  export let loading = false;
  export let onEdit = () => {};
  export let onRefresh = () => {};

  let sortBy = 'createdAt';
  let searchQuery = '';

  $: filteredProducts = products
    .filter(p => 
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'quantity') return a.quantity - b.quantity;
      return 0;
    });

  async function handleDelete(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await productAPI.delete(productId);
      await onRefresh();
      toast.add('Product deleted successfully', 'success');
    } catch (error) {
      const apiError = handleAPIError(error);
      toast.add(apiError.message, 'error');
    }
  }

  function formatPrice(price) {
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
      <h3 class="text-lg font-semibold text-gray-900">Products List</h3>
      
      <div class="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search products..."
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        />
        
        <select
          bind:value={sortBy}
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="quantity">Sort by Stock</option>
        </select>

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
  {:else if filteredProducts.length === 0}
    <div class="p-12 text-center">
      <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
      <p class="text-gray-500">
        {#if searchQuery}
          No products found matching your search
        {:else}
          No products yet
        {/if}
      </p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-3 text-left font-semibold text-gray-900">Product</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-900">Category</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-900">Price</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-900">Stock</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          {#each filteredProducts as product (product.id)}
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  {#if product.image}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      class="w-10 h-10 object-cover rounded"
                    />
                  {:else}
                    <div class="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  {/if}
                  <div>
                    <p class="font-medium text-gray-900">{product.name}</p>
                    <p class="text-xs text-gray-500">{product.brand}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize">
                  {product.category.toLowerCase()}
                </span>
              </td>
              <td class="px-6 py-4 font-medium text-gray-900">
                {formatPrice(product.price)}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <span class="text-gray-900">{product.quantity}</span>
                  <span class="text-xs px-2 py-1 rounded"
                    class:bg-yellow-100={product.quantity > 0 && product.quantity <= 10}
                    class:text-yellow-800={product.quantity > 0 && product.quantity <= 10}
                    class:bg-red-100={product.quantity === 0}
                    class:text-red-800={product.quantity === 0}
                  >
                    {product.quantity === 0 ? 'Low' : product.quantity <= 10 ? 'Low' : 'OK'}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-block px-3 py-1 text-xs font-medium rounded-full"
                  class:bg-green-100={product.inStock}
                  class:text-green-800={product.inStock}
                  class:bg-red-100={!product.inStock}
                  class:text-red-800={!product.inStock}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button
                    on:click={() => onEdit(product)}
                    class="text-primary-600 hover:text-primary-900 font-medium text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    on:click={() => handleDelete(product.id)}
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
      Showing {filteredProducts.length} of {products.length} products
    </div>
  {/if}
</div>