<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { auth, toast, dashboard } from '../../lib/stores.js';
  import { adminAPI, productAPI, serviceAPI, contactAPI, orderAPI, handleAPIError } from '../../lib/api.js';
  
  // Components
  import LoginForm from '../../lib/components/auth/LoginForm.svelte';
  import Sidebar from '../../lib/components/layout/Sidebar.svelte';
  import Header from '../../lib/components/layout/Header.svelte';
  import DashboardOverview from '../../lib/components/dashboard/DashboardOverview.svelte';
  import ProductsTab from '../../lib/components/products/ProductsTab.svelte';
  import ServicesTab from '../../lib/components/services/ServicesTab.svelte';
  import MessagesTab from '../../lib/components/messages/MessagesTab.svelte';
  
  let isLoggedIn = false;
  let currentAdmin = null;
  let activeTab = 'overview';
  let loading = false;
  
  let dashboardData = {
    stats: null,
    products: [],
    services: [],
    messages: [],
    orders: []
  };

  onMount(() => {
    auth.subscribe(authState => {
      isLoggedIn = authState.isAuthenticated;
      currentAdmin = authState.admin;
      
      if (isLoggedIn) {
        loadDashboardData();
      }
    });
  });

  async function handleLogin(credentials) {
    try {
      loading = true;
      const response = await adminAPI.login(credentials);
      const { admin, token } = response.data.data;
      
      auth.login(admin, token);
      toast.add('Login successful!', 'success');
    } catch (error) {
      const apiError = handleAPIError(error);
      toast.add(apiError.message, 'error');
    } finally {
      loading = false;
    }
  }

  async function handleLogout() {
    auth.logout();
    toast.add('Logged out successfully', 'success');
    await goto('/');
  }

  async function loadDashboardData() {
    try {
      loading = true;
      
      const [statsRes, productsRes, servicesRes, messagesRes, ordersRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        productAPI.getAll(),
        serviceAPI.getAll(false),
        contactAPI.getAll(),
        orderAPI.getAll()
      ]);

      dashboardData = {
        stats: statsRes.data.data,
        products: productsRes.data.data,
        services: servicesRes.data.data,
        messages: messagesRes.data.data,
        orders: ordersRes.data.data
      };

      dashboard.setAll(dashboardData);
    } catch (error) {
      const apiError = handleAPIError(error);
      console.error('Error loading dashboard:', error);
      toast.add(apiError.message, 'error');
    } finally {
      loading = false;
    }
  }

  function handleTabChange(tab) {
    activeTab = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleMarkMessageRead(messageId) {
    try {
      await contactAPI.markAsRead(messageId);
      await loadDashboardData();
      toast.add('Message marked as read', 'success');
    } catch (error) {
      const apiError = handleAPIError(error);
      toast.add(apiError.message, 'error');
    }
  }
</script>

<svelte:head>
  <title>Admin Dashboard - ASIO CONSULT</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  {#if !isLoggedIn}
    <LoginForm
      onLogin={handleLogin}
      loading={loading}
    />
  {:else}
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <Sidebar
        {activeTab}
        unreadMessageCount={dashboardData.stats?.unreadMessages || 0}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      />

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <Header
          title={activeTab === 'overview' ? 'Dashboard' : activeTab === 'products' ? 'Products' : activeTab === 'services' ? 'Services' : 'Messages'}
          description={activeTab === 'overview' ? 'Welcome to ASIO CONSULT admin dashboard' : 'Manage your ' + activeTab}
          adminName={currentAdmin?.name || 'Admin'}
          onLogout={handleLogout}
        />

        <!-- Page Content -->
        <div class="flex-1 overflow-auto">
          <div class="p-8">
            {#if activeTab === 'overview'}
              <DashboardOverview
                stats={dashboardData.stats}
                messages={dashboardData.messages}
                loading={loading}
                onMarkMessageRead={handleMarkMessageRead}
              />
            {:else if activeTab === 'products'}
              <ProductsTab
                products={dashboardData.products}
                loading={loading}
                onRefresh={loadDashboardData}
              />
            {:else if activeTab === 'services'}
              <ServicesTab
                services={dashboardData.services}
                loading={loading}
                onRefresh={loadDashboardData}
              />
            {:else if activeTab === 'messages'}
              <MessagesTab
                messages={dashboardData.messages}
                loading={loading}
                onRefresh={loadDashboardData}
              />
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  :global(body) {
    @apply m-0 p-0 bg-gray-50;
  }
</style>