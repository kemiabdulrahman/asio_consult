<script>
  export let product;
  import { cart, toast } from '../lib/stores.js';

  function addToCart() {
    cart.addItem(product);
    toast.add(`${product.name} added to cart!`, 'success');
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  }
</script>

<div class="card hover:shadow-lg transition-shadow duration-300">
  <div class="relative mb-4">
    <img 
      src={product.image || '/images/laptop-placeholder.jpg'} 
      alt={product.name}
      class="w-full h-48 object-cover rounded-lg"
    />
    {#if !product.inStock}
      <span class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
        Out of Stock
      </span>
    {:else if product.quantity < 5}
      <span class="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
        Low Stock
      </span>
    {/if}
  </div>

  <div class="flex-1">
    <h3 class="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
    <p class="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
    
    {#if product.specs}
      <div class="space-y-1 mb-3">
        {#each Object.entries(product.specs || {}).slice(0, 3) as [key, value]}
          <p class="text-xs text-gray-500">
            <span class="font-medium">{key}:</span> {value}
          </p>
        {/each}
      </div>
    {/if}

    <div class="flex items-center justify-between">
      <span class="text-xl font-bold text-primary-600">
        {formatPrice(product.price)}
      </span>
      <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
        {product.category}
      </span>
    </div>
  </div>

  <div class="mt-4 flex space-x-2">
    <a 
      href="/shop/{product.id}" 
      class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded text-center transition-colors duration-200"
    >
      View Details
    </a>
    {#if product.inStock}
      <button 
        on:click={addToCart}
        class="flex-1 btn-primary"
      >
        Add to Cart
      </button>
    {:else}
      <button 
        disabled
        class="flex-1 bg-gray-300 text-gray-500 font-medium py-2 px-4 rounded cursor-not-allowed"
      >
        Out of Stock
      </button>
    {/if}
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>