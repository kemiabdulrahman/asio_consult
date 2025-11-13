<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { userAuth, toast } from '../../lib/stores.js';
  import { onMount } from 'svelte';

  let email = '';
  let password = '';
  let loading = false;
  let showPassword = false;

  // Check if already logged in
  let userAuthState;
  userAuth.subscribe(state => {
    userAuthState = state;
  });

  onMount(() => {
    if (userAuthState?.isLoggedIn) {
      // Already logged in, redirect to home or cart
      const redirect = $page.url.searchParams.get('redirect') || '/';
      goto(redirect);
    }
  });

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      toast.add('Please enter both email and password', 'error');
      return;
    }

    if (!email.includes('@')) {
      toast.add('Please enter a valid email address', 'error');
      return;
    }

    loading = true;
    try {
      // Call login API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store user data and token
      userAuth.login(data.data.user, data.data.token);
      
      toast.add('Successfully logged in!', 'success');
      
      // Redirect to cart or home
      const redirect = $page.url.searchParams.get('redirect') || '/';
      goto(redirect);
    } catch (error) {
      console.error('Login error:', error);
      toast.add(error.message || 'Failed to log in. Please try again.', 'error');
    } finally {
      loading = false;
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }
</script>

<svelte:head>
  <title>Log In - ASIO CONSULT</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-primary-50 to-gray-100 flex items-center justify-center px-4 py-12">
  <div class="w-full max-w-md">
    <!-- Logo Section -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">ASIO CONSULT</h1>
      <p class="text-gray-600">Welcome Back</p>
    </div>

    <!-- Login Form Card -->
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Log In</h2>

      <form on:submit|preventDefault={handleLogin} class="space-y-4">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            bind:value={email}
            on:keydown={handleKeyDown}
            disabled={loading}
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50"
            placeholder="you@example.com"
          />
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              bind:value={password}
              on:keydown={handleKeyDown}
              disabled={loading}
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50"
              placeholder="Enter your password"
            />
            <button
              type="button"
              on:click={() => showPassword = !showPassword}
              disabled={loading}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              {#if showPassword}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              {:else}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              {/if}
            </button>
          </div>
        </div>

        <!-- Forgot Password Link -->
        <div class="flex justify-end">
          <a href="/forgot-password" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Forgot password?
          </a>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          disabled={loading}
          class="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {#if loading}
            <span class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          {:else}
            Log In
          {/if}
        </button>
      </form>

      <!-- Divider -->
      <div class="my-6 flex items-center gap-4">
        <div class="flex-1 h-px bg-gray-300"></div>
        <span class="text-sm text-gray-500">or</span>
        <div class="flex-1 h-px bg-gray-300"></div>
      </div>

      <!-- Sign Up Link -->
      <div class="text-center">
        <p class="text-gray-600 mb-4">
          Don't have an account?
          <a href="/register" class="text-primary-600 hover:text-primary-700 font-semibold">
            Sign up here
          </a>
        </p>
      </div>

      <!-- Back to Shopping -->
      <a 
        href="/" 
        class="block w-full py-2 text-center text-gray-600 hover:text-gray-900 text-sm transition-colors"
      >
        ← Back to Shopping
      </a>
    </div>

    <!-- Footer Text -->
    <p class="text-center text-gray-600 text-sm mt-6">
      By logging in, you agree to our
      <a href="/terms" class="text-primary-600 hover:text-primary-700">Terms & Conditions</a>
    </p>
  </div>
</div>
