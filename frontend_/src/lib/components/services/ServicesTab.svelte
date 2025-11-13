<script>
  import ServiceForm from './ServiceForm.svelte';
  import ServiceTable from './ServiceTable.svelte';
  
  export let services = [];
  export let loading = false;
  export let onRefresh = () => {};

  let editingService = null;

  function handleEdit(service) {
    editingService = service;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleEditCancel() {
    editingService = null;
  }

  async function handleFormSuccess() {
    editingService = null;
    await onRefresh();
  }
</script>

<div>
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-2">Manage Services</h2>
    <p class="text-gray-600">Add, edit, and manage your service offerings</p>
  </div>

  <!-- Service Form -->
  <ServiceForm
    bind:editingService
    onSubmitSuccess={handleFormSuccess}
  />

  <!-- Services Table -->
  <ServiceTable
    {services}
    {loading}
    onEdit={handleEdit}
    {onRefresh}
  />
</div>