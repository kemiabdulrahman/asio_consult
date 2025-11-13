<script>
  import { toast } from '../../stores.js';
  
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
  }
</script>

<div class="min-h-screen flex items-center justify-center">
  <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Admin Login</h1>
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
          bind:value={password}
          required
          class="input-field"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        class="w-full btn-primary py-3"
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
  </div>
</div>

<style lang="postcss">
  :global(.input-field) {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
  }
</style>