<script>
  import { toast } from '../../stores.js';
  import { productAPI, handleAPIError } from '../../../lib/api.js';
  
  export let editingProduct = null;
  export let onSubmitSuccess = () => {};
  
  let loading = false;
  let imagesInput;
  let dragOver = false;
  
  let form = {
    name: '',
    description: '',
    price: '',
    category: 'LAPTOP',
    brand: '',
    specs: '{}',
    quantity: '',
    inStock: true,
    images: [],
    imagePreviews: []
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
      images: [],
      imagePreviews: editingProduct.images?.map(img => ({
        url: img.imageUrl,
        isExisting: true,
        id: img.id,
        order: img.order
      })) || []
    };
  }

  function handleImageChange(event) {
    const files = event.target.files;
    if (!files) return;

    addFilesToImages(Array.from(files));
  }

  function addFilesToImages(files) {
    const validFiles = [];

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.add(`${file.name} is too large (max 5MB)`, 'error');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.add(`${file.name} is not a valid image`, 'error');
        return;
      }

      validFiles.push(file);
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        form.images.push(file);
        form.imagePreviews.push({
          url: e.target?.result,
          isExisting: false,
          file: file
        });
        form.imagePreviews = form.imagePreviews;
      };
      reader.readAsDataURL(file);
    });
  }

  function removeImage(index) {
    form.imagePreviews = form.imagePreviews.filter((_, i) => i !== index);
    form.images = form.images.filter((_, i) => i !== index);
  }

  function moveImage(index, direction) {
    if ((direction === -1 && index === 0) || (direction === 1 && index === form.imagePreviews.length - 1)) {
      return;
    }

    const newIndex = index + direction;
    [form.imagePreviews[index], form.imagePreviews[newIndex]] = [form.imagePreviews[newIndex], form.imagePreviews[index]];
    [form.images[index], form.images[newIndex]] = [form.images[newIndex], form.images[index]];
    
    form.imagePreviews = form.imagePreviews;
    form.images = form.images;
  }

  function handleDragOver(e) {
    e.preventDefault();
    dragOver = true;
  }

  function handleDragLeave(e) {
    e.preventDefault();
    dragOver = false;
  }

  function handleDrop(e) {
    e.preventDefault();
    dragOver = false;

    const files = e.dataTransfer?.files;
    if (files) {
      addFilesToImages(Array.from(files));
    }
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
      
      // Add all new images
      form.imagePreviews.forEach((preview, index) => {
        if (!preview.isExisting && preview.file) {
          formData.append('images', preview.file);
        }
      });

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
      images: [],
      imagePreviews: []
    };
    if (imagesInput) imagesInput.value = '';
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

    <!-- Multi-Image Upload -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Product Images (Drag & Drop or Click to Upload)
      </label>
      
      <div
        on:dragover={handleDragOver}
        on:dragleave={handleDragLeave}
        on:drop={handleDrop}
        class={`relative border-2 border-dashed rounded-lg p-6 text-center transition ${
          dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
        }`}
      >
        <input
          type="file"
          bind:this={imagesInput}
          on:change={handleImageChange}
          accept="image/*"
          multiple
          disabled={loading}
          class="hidden"
        />
        
        <button
          type="button"
          on:click={() => imagesInput?.click()}
          disabled={loading}
          class="text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50"
        >
          Click to upload
        </button>
        <p class="text-gray-500 text-sm mt-1">or drag and drop</p>
        <p class="text-gray-400 text-xs mt-2">Max 5MB per image • JPG, PNG, WebP, GIF</p>
      </div>

      <!-- Image Previews with Reorder -->
      {#if form.imagePreviews.length > 0}
        <div class="mt-4 space-y-2">
          <p class="text-sm font-medium text-gray-700">Images ({form.imagePreviews.length})</p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            {#each form.imagePreviews as preview, index (index)}
              <div class="relative group">
                <img
                  src={preview.url}
                  alt={`Preview ${index + 1}`}
                  class="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="absolute top-1 left-1 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded">
                  #{index + 1}
                </div>

                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-lg flex items-center justify-center gap-1 transition opacity-0 group-hover:opacity-100">
                  {#if index > 0}
                    <button
                      type="button"
                      on:click={() => moveImage(index, -1)}
                      title="Move up"
                      class="bg-white text-gray-800 p-1.5 rounded hover:bg-gray-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  {/if}

                  {#if index < form.imagePreviews.length - 1}
                    <button
                      type="button"
                      on:click={() => moveImage(index, 1)}
                      title="Move down"
                      class="bg-white text-gray-800 p-1.5 rounded hover:bg-gray-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  {/if}

                  <button
                    type="button"
                    on:click={() => removeImage(index)}
                    title="Remove"
                    class="bg-red-500 text-white p-1.5 rounded hover:bg-red-600"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
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
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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