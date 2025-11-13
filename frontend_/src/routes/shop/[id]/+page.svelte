<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { productAPI } from '../../../lib/api.js';
  import { cart, toast } from '../../../lib/stores.js';
  import ProductGallery from '../../../components/ProductGallery.svelte';

  let product = null;
  let loading = true;
  let quantity = 1;

  onMount(async () => {
    await loadProduct();
  });

  async function loadProduct() {
    try {
      loading = true;
      const productId = $page.params.id;
      const response = await productAPI.getById(productId);
      product = response.data.data;
    } catch (error) {
      console.error('Error loading product:', error);
      toast.add('Product not found', 'error');
    } finally {
      loading = false;
    }
  }

  function addToCart() {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        cart.addItem(product);
      }
      toast.add(`${quantity} ${product.name}(s) added to cart!`, 'success');
      quantity = 1;
    }
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  }
</script>

<svelte:head>
  <title>{product?.name || 'Product'} - ASIO CONSULT</title>
  <meta name="description" content={product?.description || 'Quality laptops and accessories from ASIO CONSULT'} />
</svelte:head>

{#if loading}
  <div class="min-h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
  </div>
{:else if !product}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
      <a href="/shop" class="btn-primary">Back to Shop</a>
    </div>
  </div>
{:else}
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="mb-8">
      <ol class="flex items-center space-x-2 text-sm">
        <li><a href="/" class="text-gray-500 hover:text-gray-700">Home</a></li>
        <li><span class="text-gray-400">/</span></li>
        <li><a href="/shop" class="text-gray-500 hover:text-gray-700">Shop</a></li>
        <li><span class="text-gray-400">/</span></li>
        <li class="text-gray-900 font-medium">{product.name}</li>
      </ol>
    </nav>

    <div class="lg:grid lg:grid-cols-2 lg:gap-12">
      <!-- Product Images Gallery -->
      <div class="mb-8 lg:mb-0">
        <ProductGallery {product} />
      </div>

      <!-- Product Info -->
      <div>
        <!-- Stock Status -->
        <div class="mb-4">
          {#if product.inStock}
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              In Stock ({product.quantity} available)
            </span>
          {:else}
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Out of Stock
            </span>
          {/if}
        </div>

        <!-- Product Name & Category -->
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p class="text-lg text-gray-600 mb-4">{product.brand}</p>
        
        <!-- Price -->
        <div class="mb-6">
          <span class="text-3xl font-bold text-primary-600">{formatPrice(product.price)}</span>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Description</h3>
          <p class="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        <!-- Specifications -->
        {#if product.specs}
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-1 gap-3">
                {#each Object.entries(product.specs) as [key, value]}
                  <div class="flex justify-between border-b border-gray-200 pb-2">
                    <span class="font-medium text-gray-700">{key}:</span>
                    <span class="text-gray-600">{value}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/if}

        <!-- Add to Cart Section -->
        {#if product.inStock}
          <div class="border-t pt-6">
            <div class="flex items-center space-x-4 mb-4">
              <label for="quantity" class="text-sm font-medium text-gray-700">Quantity:</label>
              <select 
                id="quantity" 
                bind:value={quantity}
                class="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                {#each Array(Math.min(product.quantity, 10)) as _, i}
                  <option value={i + 1}>{i + 1}</option>
                {/each}
              </select>
            </div>

            <div class="flex space-x-4">
              <button 
                on:click={addToCart}
                class="flex-1 btn-primary py-3 text-lg"
              >
                Add to Cart - {formatPrice(product.price * quantity)}
              </button>
              <a 
                href="/contact?product={product.name}"
                class="flex-1 btn-secondary py-3 text-lg text-center"
              >
                Request Quote
              </a>
            </div>
          </div>
        {:else}
          <div class="border-t pt-6">
            <button 
              disabled
              class="w-full bg-gray-300 text-gray-500 font-medium py-3 rounded-lg cursor-not-allowed"
            >
              Out of Stock
            </button>
            <a 
              href="/contact?product={product.name}"
              class="w-full btn-secondary py-3 text-center block mt-4"
            >
              Get Notified When Available
            </a>
          </div>
        {/if}

        <!-- Additional Info -->
        <div class="mt-8 space-y-4">
          <div class="border rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-2">🚚 Free Delivery</h4>
            <p class="text-sm text-gray-600">Free delivery within Ibadan metropolis</p>
          </div>
          <div class="border rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-2">🛠️ Warranty</h4>
            <p class="text-sm text-gray-600">1 year manufacturer warranty included</p>
          </div>
          <div class="border rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-2">💬 Support</h4>
            <p class="text-sm text-gray-600">Professional setup and support available</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div class="mt-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
      <!-- Related products would go here -->
    </div>
  </div>
{/if}