<script>
  import '../app.css';
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
  import Toast from '../components/Toast.svelte';
  import { onMount } from 'svelte';
  import { auth } from '../lib/stores.js';

  onMount(() => {
    auth.checkAuth();
  });
</script>

<svelte:head>
  <title>ASIO CONSULT - Educational ICT Solutions</title>
  <meta name="description" content="ASIO CONSULT provides educational ICT solutions including laptop sales, SASR software, ICT training and consultancy services in Ibadan, Nigeria." />
</svelte:head>

<div class="min-h-screen flex flex-col">
  <Navbar />
  
  <main class="flex-grow">
    <slot />
  </main>
  
  <Footer />
  <Toast />
</div>