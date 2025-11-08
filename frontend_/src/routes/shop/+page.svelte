<script>
  import { onMount } from 'svelte';
  import { productAPI } from '../../lib/api.js';
  import { toast } from '../../lib/stores.js';
  import ProductCard from '../../components/ProductCard.svelte';

  let products = [];
  let filteredProducts = [];
  let loading = true;
  let searchQuery = '';
  let selectedCategory = 'all';
  let priceRange = 'all';
  let sortBy = 'newest';

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'laptop', label: 'Laptops' },
    { value: 'accessory', label: 'Accessories' },
    { value: 'software', label: 'Software' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50000', label: '₦0 - ₦50,000' },
    { value: '50000-100000', label: '₦50,000 - ₦100,000' },
    { value: '100000-200000', label: '₦100,000 - ₦200,000' },
    { value: '200000+', label: '₦200,000+' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];

  onMount(async () => {
    await loadProducts();
  });

  async function loadProducts() {
    try {
      loading = true;
      const response = await productAPI.getAll();
      products = response.data.data;
      filterAndSortProducts();
    } catch (error) {
      console.error('Error loading products:', error);
      toast.add('Failed to load products', 'error');
    } finally {
      loading = false;
    }
  }

  function filterAndSortProducts() {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-');
      if (max) {
        filtered = filtered.filter(product => 
          product.price >= parseInt(min) && product.price <= parseInt(max)
        );
      } else if (priceRange === '200000+') {
        filtered = filtered.filter(product => product.price >= 200000);
      }
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    filteredProducts = filtered;
  }

  $: {
    if (products.length > 0) {
      filterAndSortProducts();
    }
  }
</script>

<svelte:head>
  <title>Shop - ASIO CONSULT</title>
  <meta name="description" content="Shop quality laptops and ICT accessories from ASIO CONSULT. Educational and business grade computers with warranty." />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Page Header -->
  <div class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Shop Laptops & Accessories</h1>
        <p class="text-lg text-gray-600">Quality computers and accessories for education and business</p>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="lg:grid lg:grid-cols-4 lg:gap-8">
      <!-- Filters Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 class="text-lg font-semibold text-gray-900">Filters</h2>

          <!-- Search -->
          <div>
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <input
              id="search"
              type="text"
              bind:value={searchQuery}
              placeholder="Search by name, brand..."
              class="input-field"
            />
          </div>

          <!-- Category Filter -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select id="category" bind:value={selectedCategory} class="input-field">
              {#each categories as category}
                <option value={category.value}>{category.label}</option>
              {/each}
            </select>
          </div>

          <!-- Price Range Filter -->
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <select id="price" bind:value={priceRange} class="input-field">
              {#each priceRanges as range}
                <option value={range.value}>{range.label}</option>
              {/each}
            </select>
          </div>

          <!-- Sort Options -->
          <div>
            <label for="sort" class="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select id="sort" bind:value={sortBy} class="input-field">
              {#each sortOptions as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </div>

          <!-- Reset Filters -->
          <button
            on:click={() => {
              searchQuery = '';
              selectedCategory = 'all';
              priceRange = 'all';
              sortBy = 'newest';
            }}
            class="w-full btn-secondary"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="lg:col-span-3 mt-8 lg:mt-0">
        <!-- Results Header -->
        <div class="bg-white rounded-lg shadow p-4 mb-6">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-600">
              {#if loading}
                Loading products...
              {:else}
                Showing {filteredProducts.length} of {products.length} products
              {/if}
            </p>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">View:</span>
              <button class="p-2 text-primary-600">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        {#if loading}
          <div class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          </div>
        {:else if filteredProducts.length === 0}
          <div class="text-center py-12">
            <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p class="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {#each filteredProducts as product}
              <ProductCard {product} />
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>