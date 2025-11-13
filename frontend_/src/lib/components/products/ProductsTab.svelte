<script>
  import ProductForm from './ProductForm.svelte';
  import ProductTable from './ProductTable.svelte';
  
  export let products = [];
  export let loading = false;
  export let onRefresh = () => {};

  let editingProduct = null;

  function handleEdit(product) {
    editingProduct = product;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleEditCancel() {
    editingProduct = null;
  }

  async function handleFormSuccess() {
    editingProduct = null;
    await onRefresh();
  }
</script>

<div>
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-2">Manage Products</h2>
    <p class="text-gray-600">Add, edit, and manage your product catalog</p>
  </div>

  <!-- Product Form -->
  <ProductForm
    bind:editingProduct
    onSubmitSuccess={handleFormSuccess}
  />

  <!-- Products Table -->
  <ProductTable
    {products}
    {loading}
    onEdit={handleEdit}
    {onRefresh}
  />
</div>