<script>
  import { toast } from '../../../lib/stores.js';
  import { serviceAPI, handleAPIError } from '../../../lib/api.js';
  
  export let editingService = null;
  export let onSubmitSuccess = () => {};
  
  let loading = false;
  
  let form = {
    name: '',
    description: '',
    price: '',
    category: 'TRAINING',
    duration: '',
    features: '[]',
    isActive: true
  };

  $: if (editingService) {
    form = {
      name: editingService.name,
      description: editingService.description,
      price: editingService.price?.toString() || '',
      category: editingService.category || 'TRAINING',
      duration: editingService.duration || '',
      features: editingService.features ? JSON.stringify(editingService.features) : '[]',
      isActive: editingService.isActive
    };
  }

  async function handleSubmit() {
    if (!form.name || !form.description || !form.category) {
      toast.add('Please fill in all required fields', 'error');
      return;
    }

    try {
      loading = true;

      const serviceData = {
        name: form.name,
        description: form.description,
        price: form.price ? parseFloat(form.price) : null,
        category: form.category,
        duration: form.duration || null,
        features: form.features ? JSON.parse(form.features) : null,
        isActive: form.isActive
      };

      if (editingService) {
        await serviceAPI.update(editingService.id, serviceData);
        toast.add('Service updated successfully', 'success');
      } else {
        await serviceAPI.create(serviceData);
        toast.add('Service created successfully', 'success');
        resetForm();
      }

      onSubmitSuccess();
    } catch (error) {
      const apiError = handleAPIError(error);
      toast.add(apiError.message, 'error');
      console.error('Error:', error);
    } finally {
      loading = false;
    }
  }

  function resetForm() {
    form = {
      name: '',
      description: '',
      price: '',
      category: 'TRAINING',
      duration: '',
      features: '[]',
      isActive: true
    };
    editingService = null;
  }
</script>

<div class="bg-white rounded-lg shadow p-6 mb-8">
  <h3 class="text-lg font-semibold text-gray-900 mb-6">
    {editingService ? 'Edit Service' : 'Add New Service'}
  </h3>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
          Service Name *
        </label>
        <input
          id="name"
          type="text"
          bind:value={form.name}
          required
          disabled={loading}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          placeholder="e.g., SASR Software Implementation"
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
          <option value="TRAINING">Training</option>
          <option value="SOFTWARE">Software</option>
          <option value="CONSULTING">Consulting</option>
        </select>
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
        placeholder="Detailed service description..."
      ></textarea>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
          Price (₦)
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          bind:value={form.price}
          disabled={loading}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          placeholder="50000 (optional)"
        />
      </div>
      
      <div>
        <label for="duration" class="block text-sm font-medium text-gray-700 mb-2">
          Duration
        </label>
        <input
          id="duration"
          type="text"
          bind:value={form.duration}
          disabled={loading}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          placeholder="e.g., 2 weeks, 1 month"
        />
      </div>
    </div>

    <div>
      <label for="features" class="block text-sm font-medium text-gray-700 mb-2">
        Features (JSON array)
      </label>
      <textarea
        id="features"
        rows="3"
        bind:value={form.features}
        disabled={loading}
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 font-mono text-sm resize-none"
        placeholder='["Feature 1", "Feature 2", "Feature 3"]'
      ></textarea>
      <p class="text-xs text-gray-500 mt-1">Enter as JSON array of strings</p>
    </div>

    <div class="flex items-center">
      <input
        id="isActive"
        type="checkbox"
        bind:checked={form.isActive}
        disabled={loading}
        class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
      />
      <label for="isActive" class="ml-2 text-sm text-gray-700">
        Active (visible to customers)
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
        {editingService ? 'Update Service' : 'Add Service'}
      </button>
      
      {#if editingService}
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