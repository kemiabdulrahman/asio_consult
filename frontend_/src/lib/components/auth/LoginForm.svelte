<script>
  import { toast } from '../../../lib/stores.js';
  
  export let onLogin;
  export let loading = false;
  
  let email = '';
  let password = '';
  
  async function handleSubmit() {
    if (!email || !password) {
      toast.add('Please fill in all fields', 'error');
      return;
    }
    
    await onLogin({ email, password });
    email = '';
    password = '';
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Admin Login</h1>
      <p class="text-gray-600 mt-2">Sign in to manage ASIO CONSULT</p>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          disabled={loading}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
          bind:value={password}
          required
          disabled={loading}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        class="w-full px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        class:opacity-50={loading}
      >
        {#if loading}
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

    <p class="text-center text-sm text-gray-600 mt-6">
      Contact support if you forgot your password
    </p>
  </div>
</div>