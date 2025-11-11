<script>
  import { onMount } from 'svelte';
  import { auth, toast } from '../../lib/stores.js';
  import { adminAPI, productAPI, serviceAPI, contactAPI } from '../../lib/api.js';
  import { goto } from '$app/navigation';

  let isLoggedIn = false;
  let loginForm = { email: '', password: '' };
  let loginLoading = false;
  let dashboardStats = null;
  let products = [];
  let services = [];
  let messages = [];
  let activeTab = 'overview';
  let loading = false;

  // Product form
  let productForm = {
    name: '',
    description: '',
    price: '',
    category: 'laptop',
    brand: '',
    specs: {},
    inStock: true,
    quantity: 0,
    image: null,
    imagePreview: null
  };
  let editingProduct = null;
  let productImageInput;

  // Service form
  let serviceForm = {
    name: '',
    description: '',
    price: '',
    category: 'training',
    duration: '',
    features: [],
    isActive: true
  };
  let editingService = null;

  onMount(() => {
    auth.subscribe(authState => {
      isLoggedIn = authState.isAuthenticated;
      if (isLoggedIn) {
        loadDashboardData();
      }
    });
  });

  async function handleLogin() {
    if (!loginForm.email || !loginForm.password) {
      toast.add('Please fill in all fields', 'error');
      return;
    }

    try {
      loginLoading = true;
      const response = await adminAPI.login(loginForm);
      const { admin, token } = response.data.data;
      
      auth.login(admin, token);
      toast.add('Login successful!', 'success');
      await loadDashboardData();
    } catch (error) {
      console.error('Login error:', error);
      toast.add('Invalid email or password', 'error');
    } finally {
      loginLoading = false;
    }
  }

  async function handleLogout() {
    auth.logout();
    toast.add('Logged out successfully', 'success');
    goto('/');
  }

  async function loadDashboardData() {
    try {
      loading = true;
      const [statsRes, productsRes, servicesRes, messagesRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        productAPI.getAll(),
        serviceAPI.getAll(),
        contactAPI.getAll()
      ]);

      dashboardStats = statsRes.data.data;
      products = productsRes.data.data;
      services = servicesRes.data.data;
      messages = messagesRes.data.data;
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.add('Failed to load dashboard data', 'error');
    } finally {
      loading = false;
    }
  }

  function handleProductImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.add('Image must be less than 5MB', 'error');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.add('Please upload a valid image file', 'error');
      return;
    }

    productForm.image = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      productForm.imagePreview = e.target?.result;
    };
    reader.readAsDataURL(file);
  }

  async function handleProductSubmit() {
    try {
      const formData = new FormData();
      formData.append('name', productForm.name);
      formData.append('description', productForm.description);
      formData.append('price', parseFloat(productForm.price));
      formData.append('category', productForm.category);
      formData.append('brand', productForm.brand);
      formData.append('quantity', parseInt(productForm.quantity));
      formData.append('inStock', productForm.inStock);
      formData.append('specs', typeof productForm.specs === 'string' ? productForm.specs : JSON.stringify(productForm.specs));
      
      if (productForm.image) {
        formData.append('image', productForm.image);
      }

      if (editingProduct) {
        // For updates, use JSON if no new image, otherwise use FormData
        if (!productForm.image) {
          const productData = {
            name: productForm.name,
            description: productForm.description,
            price: parseFloat(productForm.price),
            quantity: parseInt(productForm.quantity),
            category: productForm.category,
            brand: productForm.brand,
            inStock: productForm.inStock,
            specs: typeof productForm.specs === 'string' ? productForm.specs : JSON.stringify(productForm.specs)
          };
          await productAPI.update(editingProduct.id, productData);
        } else {
          await productAPI.update(editingProduct.id, formData);
        }
        toast.add('Product updated successfully', 'success');
      } else {
        // For new products, use FormData to handle image upload
        const response = await fetch('/api/products', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to create product');
        toast.add('Product created successfully', 'success');
      }

      // Reset form and reload data
      resetProductForm();
      await loadDashboardData();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.add('Failed to save product', 'error');
    }
  }

  async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await productAPI.delete(productId);
      toast.add('Product deleted successfully', 'success');
      await loadDashboardData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.add('Failed to delete product', 'error');
    }
  }

  function editProduct(product) {
    editingProduct = product;
    productForm = {
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      brand: product.brand || '',
      specs: JSON.stringify(product.specs || {}),
      inStock: product.inStock,
      quantity: product.quantity
    };
    activeTab = 'products';
  }

  function resetProductForm() {
    editingProduct = null;
    productForm = {
      name: '',
      description: '',
      price: '',
      category: 'laptop',
      brand: '',
      specs: {},
      inStock: true,
      quantity: 0,
      image: null,
      imagePreview: null
    };
    if (productImageInput) productImageInput.value = '';
  }

  async function markMessageAsRead(messageId) {
    try {
      await contactAPI.markAsRead(messageId);
      toast.add('Message marked as read', 'success');
      await loadDashboardData();
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.add('Failed to update message', 'error');
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
  <title>Admin Dashboard - ASIO CONSULT</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  {#if !isLoggedIn}
    <!-- Login Form -->
    <div class="min-h-screen flex items-center justify-center">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p class="text-gray-600 mt-2">Sign in to manage ASIO CONSULT</p>
        </div>

        <form on:submit|preventDefault={handleLogin} class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              bind:value={loginForm.email}
              required
              class="input-field"
              placeholder="admin@asioconsult.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              bind:value={loginForm.password}
              required
              class="input-field"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            class="w-full btn-primary py-3"
            class:opacity-50={loginLoading}
          >
            {#if loginLoading}
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            {:else}
              Sign In
            {/if}
          </button>
        </form>
      </div>
    </div>
  {:else}
    <!-- Dashboard -->
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <div class="w-64 bg-white shadow-lg">
        <div class="p-6 border-b">
          <h1 class="text-xl font-bold text-gray-900">ASIO CONSULT</h1>
          <p class="text-sm text-gray-600">Admin Dashboard</p>
        </div>
        
        <nav class="mt-6">
          <button
            on:click={() => activeTab = 'overview'}
            class="nav-item"
            class:active={activeTab === 'overview'}
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Overview
          </button>
          
          <button
            on:click={() => activeTab = 'products'}
            class="nav-item"
            class:active={activeTab === 'products'}
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Products
          </button>
          
          <button
            on:click={() => activeTab = 'services'}
            class="nav-item"
            class:active={activeTab === 'services'}
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            Services
          </button>
          
          <button
            on:click={() => activeTab = 'messages'}
            class="nav-item"
            class:active={activeTab === 'messages'}
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Messages
            {#if messages?.filter(m => !m.isRead).length > 0}
              <span class="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {messages.filter(m => !m.isRead).length}
              </span>
            {/if}
          </button>
        </nav>

        <div class="absolute bottom-0 w-64 p-6 border-t">
          <button
            on:click={handleLogout}
            class="flex items-center w-full text-gray-600 hover:text-red-600 transition-colors"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 overflow-auto">
        <div class="p-8">
          {#if activeTab === 'overview'}
            <!-- Overview Tab -->
            <div class="mb-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
              <p class="text-gray-600">Welcome to the ASIO CONSULT admin dashboard</p>
            </div>

            {#if dashboardStats}
              <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="card">
                  <div class="flex items-center">
                    <div class="bg-blue-100 rounded-lg p-3 mr-4">
                      <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold text-gray-900">{dashboardStats.products}</h3>
                      <p class="text-gray-600">Products</p>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="flex items-center">
                    <div class="bg-green-100 rounded-lg p-3 mr-4">
                      <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold text-gray-900">{dashboardStats.services}</h3>
                      <p class="text-gray-600">Services</p>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="flex items-center">
                    <div class="bg-purple-100 rounded-lg p-3 mr-4">
                      <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold text-gray-900">{dashboardStats.messages}</h3>
                      <p class="text-gray-600">Messages</p>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="flex items-center">
                    <div class="bg-yellow-100 rounded-lg p-3 mr-4">
                      <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold text-gray-900">{dashboardStats.orders || 0}</h3>
                      <p class="text-gray-600">Orders</p>
                    </div>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Recent Messages -->
            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
              {#if messages && messages.length > 0}
                <div class="space-y-4">
                  {#each messages.slice(0, 5) as message}
                    <div class="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                      <div class="flex-1">
                        <div class="flex items-center mb-2">
                          <h4 class="font-medium text-gray-900">{message.name}</h4>
                          <span class="ml-2 text-sm text-gray-500">{message.email}</span>
                          {#if !message.isRead}
                            <span class="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">New</span>
                          {/if}
                        </div>
                        <p class="text-gray-700 font-medium">{message.subject}</p>
                        <p class="text-gray-600 text-sm mt-1">{message.message.substring(0, 100)}...</p>
                      </div>
                      <div class="ml-4 text-right">
                        <p class="text-sm text-gray-500">{new Date(message.createdAt).toLocaleDateString()}</p>
                        {#if !message.isRead}
                          <button
                            on:click={() => markMessageAsRead(message.id)}
                            class="text-sm text-primary-600 hover:text-primary-800"
                          >
                            Mark as Read
                          </button>
                        {/if}
                      </div>
                    </div>
                  {/each}
                </div>
              {:else}
                <p class="text-gray-500">No messages yet</p>
              {/if}
            </div>

          {:else if activeTab === 'products'}
            <!-- Products Tab -->
            <div class="mb-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">Manage Products</h2>
              <p class="text-gray-600">Add, edit, and manage your product catalog</p>
            </div>

            <!-- Product Form -->
            <div class="card mb-8">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              
              <form on:submit|preventDefault={handleProductSubmit} class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="product-name" class="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      id="product-name"
                      type="text"
                      bind:value={productForm.name}
                      required
                      class="input-field"
                      placeholder="e.g., Acer TravelMate Laptop"
                    />
                  </div>
                  
                  <div>
                    <label for="product-brand" class="block text-sm font-medium text-gray-700 mb-2">
                      Brand
                    </label>
                    <input
                      id="product-brand"
                      type="text"
                      bind:value={productForm.brand}
                      class="input-field"
                      placeholder="e.g., Acer, HP, Dell"
                    />
                  </div>
                </div>

                <div>
                  <label for="product-description" class="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="product-description"
                    rows="4"
                    bind:value={productForm.description}
                    required
                    class="input-field"
                    placeholder="Detailed product description..."
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label for="product-price" class="block text-sm font-medium text-gray-700 mb-2">
                      Price (₦) *
                    </label>
                    <input
                      id="product-price"
                      type="number"
                      bind:value={productForm.price}
                      required
                      class="input-field"
                      placeholder="85000"
                    />
                  </div>
                  
                  <div>
                    <label for="product-category" class="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select id="product-category" bind:value={productForm.category} class="input-field">
                      <option value="laptop">Laptop</option>
                      <option value="accessory">Accessory</option>
                      <option value="software">Software</option>
                    </select>
                  </div>
                  
                  <div>
                    <label for="product-quantity" class="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      id="product-quantity"
                      type="number"
                      bind:value={productForm.quantity}
                      required
                      class="input-field"
                      placeholder="10"
                    />
                  </div>
                </div>

                <div>
                  <label for="product-specs" class="block text-sm font-medium text-gray-700 mb-2">
                    Specifications (JSON format)
                  </label>
                  <textarea
                    id="product-specs"
                    rows="4"
                    bind:value={productForm.specs}
                    class="input-field"
                    placeholder="Enter specifications in JSON format"
                  ></textarea>
                  <p class="text-sm text-gray-500 mt-1">Enter specifications in JSON format</p>
                </div>

                <div>
                  <label for="product-image" class="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div class="flex items-center space-x-4">
                    <div class="flex-1">
                      <input
                        id="product-image"
                        type="file"
                        bind:this={productImageInput}
                        on:change={handleProductImageChange}
                        accept="image/*"
                        class="input-field"
                      />
                      <p class="text-sm text-gray-500 mt-1">Max size: 5MB. Formats: JPG, PNG, WebP</p>
                    </div>
                    {#if productForm.imagePreview}
                      <div class="flex-shrink-0">
                        <img 
                          src={productForm.imagePreview} 
                          alt="Preview" 
                          class="w-20 h-20 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    {/if}
                  </div>
                </div>

                <div class="flex items-center">
                  <input
                    id="product-instock"
                    type="checkbox"
                    bind:checked={productForm.inStock}
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label for="product-instock" class="ml-2 text-sm text-gray-700">
                    In Stock
                  </label>
                </div>

                <div class="flex space-x-4">
                  <button type="submit" class="btn-primary">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  {#if editingProduct}
                    <button type="button" on:click={resetProductForm} class="btn-secondary">
                      Cancel Edit
                    </button>
                  {/if}
                </div>
              </form>
            </div>

            <!-- Products List -->
            <div class="card">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Products List</h3>
              {#if products && products.length > 0}
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {#each products as product}
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p class="text-sm font-medium text-gray-900">{product.name}</p>
                              <p class="text-sm text-gray-500">{product.brand}</p>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                              {product.category}
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(product.price)}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <span class="text-sm text-gray-900">{product.quantity}</span>
                              <span class="ml-2 px-2 py-1 text-xs font-medium rounded-full"
                                class:bg-green-100={product.inStock}
                                class:text-green-800={product.inStock}
                                class:bg-red-100={!product.inStock}
                                class:text-red-800={!product.inStock}
                              >
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              on:click={() => editProduct(product)}
                              class="text-primary-600 hover:text-primary-900"
                            >
                              Edit
                            </button>
                            <button
                              on:click={() => deleteProduct(product.id)}
                              class="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      {/each}
                    </tbody>
                  </table>
                </div>
              {:else}
                <p class="text-gray-500">No products found</p>
              {/if}
            </div>

          {:else if activeTab === 'messages'}
            <!-- Messages Tab -->
            <div class="mb-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">Contact Messages</h2>
              <p class="text-gray-600">View and manage customer inquiries</p>
            </div>

            <div class="space-y-4">
              {#if messages && messages.length > 0}
                {#each messages as message}
                  <div class="card"
                    class:bg-blue-50={!message.isRead}
                    class:border-blue-200={!message.isRead}
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center mb-2">
                          <h3 class="text-lg font-semibold text-gray-900">{message.name}</h3>
                          <span class="ml-2 text-sm text-gray-500">{message.email}</span>
                          {#if message.phone}
                            <span class="ml-2 text-sm text-gray-500">• {message.phone}</span>
                          {/if}
                          {#if !message.isRead}
                            <span class="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">New</span>
                          {/if}
                        </div>
                        <h4 class="text-md font-medium text-gray-800 mb-3">{message.subject}</h4>
                        <p class="text-gray-700 leading-relaxed">{message.message}</p>
                      </div>
                      <div class="ml-6 text-right">
                        <p class="text-sm text-gray-500 mb-2">{new Date(message.createdAt).toLocaleDateString()}</p>
                        <div class="space-y-2">
                          {#if !message.isRead}
                            <button
                              on:click={() => markMessageAsRead(message.id)}
                              class="block text-sm text-primary-600 hover:text-primary-800"
                            >
                              Mark as Read
                            </button>
                          {/if}
                          
                            href="mailto:{message.email}?subject=Re: {message.subject}"
                            class="block text-sm text-green-600 hover:text-green-800"
                          >
                            Reply via Email
                          </a>
                          {#if message.phone}
                            <a
                              href="tel:{message.phone}"
                              class="block text-sm text-blue-600 hover:text-blue-800"
                            >
                              Call
                            </a>
                          {/if}
                        </div>
                      </div>
                    </div>
                  </div>
                {/each}
              {:else}
                <div class="card text-center">
                  <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                  <p class="text-gray-500">Customer messages will appear here</p>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .nav-item {
    @apply flex items-center w-full px-6 py-3 text-left text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors;
  }
  
  .nav-item.active {
    @apply bg-primary-50 text-primary-700 border-r-2 border-primary-700;
  }
</style>