<script>
  import { toast } from '../../stores.js';
  import { productAPI, handleAPIError } from '../../../lib/api.js';
  
  export let editingProduct = null;
  export let onSubmitSuccess = () => {};
  
  let loading = false;
  let productImageInput;
  
  let form = {
    name: '',
    description: '',
    price: '',
    category: 'LAPTOP',
    brand: '',
    specs: '{}',
    quantity: '',
    inStock: true,
    image: null,
    imagePreview: null
  };

  $: if (editingProduct) {
    form = {
      name: editingProduct.name,
      description: editingProduct.description,
      price: editingProduct.price.toString(),
      category: editingProduct.category || 'LAPTOP',
      brand: editingProduct.brand || '',
      specs: editingProduct.specs ? JSON.stringify(editingProduct.specs) : '{}',
      quantity: editingProduct.quantity?.toString() || '0',
      inStock: editingProduct.inStock,
      image: null,
      imagePreview: editingProduct.image || null
    };
  }

  function handleImageChange(event) {
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

    form.image = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      form.imagePreview = e.target?.result;
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    if (!form.name || !form.description || !form.price) {
      toast.add('Please fill in all required fields', 'error');
      return;
    }

    try {
      loading = true;

      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('category', form.category);
      formData.append('brand', form.brand);
      formData.append('quantity', form.quantity || '0');
      formData.append('specs', form.specs);
      
      if (form.image) {
        formData.append('image', form.image);
      }

      if (editingProduct) {
        await productAPI.update(editingProduct.id, formData);
        toast.add('Product updated successfully', 'success');
      } else {
        await productAPI.create(formData);
        toast.add('Product created successfully', 'success');
        resetForm();
      }

      onSubmitSuccess();
    } catch (error) {
      const apiError = handleAPIError(error);
      toast.add(apiError.message, 'error');
    } finally {
      loading = false;
    }
  }

  function resetForm() {
    form = {
      name: '',
      description: '',
      price: '',
      category: 'LAPTOP',
      brand: '',
      specs: '{}',
      quantity: '',
      inStock: true,
      image: null,
      imagePreview: null
    };
    if (productImageInput) productImageInput.value = '';
    editingProduct = null;
  }
</script>

<div class="bg-white rounded-lg shadow p-6 mb-8">
  <h3 class="text-lg font-semibold text-gray-900 mb-6">
    {editingProduct ? 'Edit Product' : 'Add New Product'}
  </h3>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
          Product Name *
        </label>
        <input
          id="name"
          type="text"
          bind:value={form.name}
          required
          disabled={loading}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          placeholder="e.g., Acer Aspire 5 Laptop"
        />
      </div>
      
      <div>
        <label for="brand" class="block text-sm font-medium text-gray-700 mb-2">
          Brand
        </label>
        <input
          id="brand"
          type="text"
          bind:value={form.brand}
          disabled={loading}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          placeholder="e.g., Acer, HP, Dell"
        />
      </div>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
        Description *
      </label>
      <textarea
        id="description"
        rows="4"
        bind:value={form.description}
        required
        disabled={loading}
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 resize-none"
        placeholder="Detailed product description..."
      ></textarea>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
          Price (₦) *
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          bind:value={form.price}
          required
          disabled={loading}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          placeholder="85000"
        />
      </div>
      
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          id="category"
          bind:value={form.category}
          disabled={loading}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
        >
          <option value="LAPTOP">Laptop</option>
          <option value="ACCESSORY">Accessory</option>
          <option value="SOFTWARE">Software</option>
        </select>
      </div>
      
      <div>
        <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          bind:value={form.quantity}
          disabled={loading}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          placeholder="10"
        />
      </div>
    </div>

    <div>
      <label for="specs" class="block text-sm font-medium text-gray-700 mb-2">
        Specifications (JSON)
      </label>
      <textarea
        id="specs"
        rows="3"
        bind:value={form.specs}
        disabled={loading}
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 font-mono text-sm resize-none"
        placeholder={`{"ram": "8GB", "storage": "256GB SSD"}`}
      ></textarea>
      <p class="text-xs text-gray-500 mt-1">Valid JSON format required</p>
    </div>

    <div>
      <label for="image" class="block text-sm font-medium text-gray-700 mb-2">
        Product Image
      </label>
      <div class="flex items-center space-x-4">
        <div class="flex-1">
          <input
            id="image"
            type="file"
            bind:this={productImageInput}
            on:change={handleImageChange}
            accept="image/*"
            disabled={loading}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
          />
          <p class="text-xs text-gray-500 mt-1">Max: 5MB • JPG, PNG, WebP, GIF</p>
        </div>
        {#if form.imagePreview}
          <div class="flex-shrink-0">
            <img 
              src={form.imagePreview} 
              alt="Preview" 
              class="w-20 h-20 object-cover rounded-lg border border-gray-300"
            />
          </div>
        {/if}
      </div>
    </div>

    <div class="flex items-center">
      <input
        id="inStock"
        type="checkbox"
        bind:checked={form.inStock}
        disabled={loading}
        class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
      />
      <label for="inStock" class="ml-2 text-sm text-gray-700">
        In Stock
      </label>
    </div>

    <div class="flex gap-4 pt-4 border-t">
      <button
        type="submit"
        disabled={loading}
        class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors font-medium"
      >
        {#if loading}
          <svg class="animate-spin h-5 w-5 inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          </svg>
        {/if}
        {editingProduct ? 'Update Product' : 'Add Product'}
      </button>
      
      {#if editingProduct}
        <button
          type="button"
          on:click={resetForm}
          disabled={loading}
          class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors font-medium"
        >
          Cancel
        </button>
      {/if}
    </div>
  </form>
</div>