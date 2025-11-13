<script>
  import { toast } from '../../stores.js';
  
  export let product = null;
  export let onSubmit = () => {};
  export let loading = false;
  
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
  
  let productImageInput;
  
  $: if (product) {
    productForm = {
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      brand: product.brand || '',
      specs: JSON.stringify(product.specs || {}),
      inStock: product.inStock,
      quantity: product.quantity,
      image: null,
      imagePreview: product.image || null
    };
  }
  
  function handleProductImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.add('Image must be less than 5MB', 'error');
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      toast.add('Please upload a valid image file', 'error');
      return;
    }
    
    productForm.image = file;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      productForm.imagePreview = e.target?.result;
    };
    reader.readAsDataURL(file);
  }
  
  async function handleSubmit() {
    if (!productForm.name || !productForm.description || !productForm.price) {
      toast.add('Please fill in all required fields', 'error');
      return;
    }
    
    await onSubmit(productForm);
    
    if (!product) {
      resetForm();
    }
  }
  
  function resetForm() {
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
</script>

<div class="bg-white rounded-lg shadow p-6 mb-8">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">
    {product ? 'Edit Product' : 'Add New Product'}
  </h3>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
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
      <button type="submit" disabled={loading} class="btn-primary">
        {product ? 'Update Product' : 'Add Product'}
      </button>
      {#if product}
        <button type="button" on:click={resetForm} class="btn-secondary">
          Cancel Edit
        </button>
      {/if}
    </div>
  </form>
</div>

<style lang="postcss">
  :global(.input-field) {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
  }
  
  :global(.btn-primary) {
    @apply px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  :global(.btn-secondary) {
    @apply px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors;
  }
</style>