<script>
  import { cart } from '../lib/stores.js';
  import { page } from '$app/stores';
  
  let isMenuOpen = false;
  let cartItemCount = 0;

  cart.subscribe(items => {
    cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  });

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="bg-white shadow-lg sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="/" class="flex items-center">
          <img src="/logo.png" alt="ASIO CONSULT" class="h-10 w-auto mr-3" />
          <span class="text-xl font-bold text-primary-700">ASIO CONSULT</span>
        </a>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="/" class="nav-link" class:active={$page.url.pathname === '/'}>
          Home
        </a>
        <a href="/shop" class="nav-link" class:active={$page.url.pathname.startsWith('/shop')}>
          Shop
        </a>
        <a href="/services" class="nav-link" class:active={$page.url.pathname === '/services'}>
          Services
        </a>
        <a href="/contact" class="nav-link" class:active={$page.url.pathname === '/contact'}>
          Contact
        </a>
        
        <!-- Cart Icon -->
        <button class="relative p-2 text-gray-600 hover:text-primary-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 7.5L5.5 21"></path>
          </svg>
          {#if cartItemCount > 0}
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          {/if}
        </button>
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden flex items-center">
        <button on:click={toggleMenu} class="text-gray-600 hover:text-primary-600 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if isMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            {/if}
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <div class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          <a href="/" class="mobile-nav-link">Home</a>
          <a href="/shop" class="mobile-nav-link">Shop</a>
          <a href="/services" class="mobile-nav-link">Services</a>
          <a href="/contact" class="mobile-nav-link">Contact</a>
        </div>
      </div>
    {/if}
  </div>
</nav>

<style lang="postcss">
  .nav-link {
    @apply text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200;
  }
  
  .nav-link.active {
    @apply text-primary-600 border-b-2 border-primary-600;
  }
  
  .mobile-nav-link {
    @apply block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50;
  }
</style>