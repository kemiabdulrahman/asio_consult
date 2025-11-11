<script>
  import { onMount } from 'svelte';
  import { productAPI, serviceAPI } from '../lib/api.js';
  import ProductCard from '../components/ProductCard.svelte';
  import ServiceCard from '../components/ServiceCard.svelte';
  import HeroSection from '../components/HeroSection.svelte';

  let featuredProducts = [];
  let services = [];
  let loading = true;

  onMount(async () => {
    try {
      const [productsRes, servicesRes] = await Promise.all([
        productAPI.getAll({ limit: 3 }),
        serviceAPI.getAll()
      ]);
      
      featuredProducts = productsRes.data.data.slice(0, 3);
      services = servicesRes.data.data.slice(0, 3);
    } catch (error) {
      console.error('Error loading homepage data:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>ASIO CONSULT - Educational ICT Solutions in Ibadan</title>
  <meta name="description" content="ASIO CONSULT provides educational ICT solutions including laptop sales, SASR software, ICT training and consultancy services in Ibadan, Nigeria." />
</svelte:head>

<!-- Hero Section -->
<HeroSection />

<!-- Featured Products Section -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
      <p class="text-xl text-gray-600">Quality laptops and accessories for educational needs</p>
    </div>

    {#if loading}
      <div class="flex justify-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each featuredProducts as product}
          <ProductCard {product} />
        {/each}
      </div>
      
      <div class="text-center mt-12">
        <a href="/shop" class="btn-primary">
          View All Products
        </a>
      </div>
    {/if}
  </div>
</section>

<!-- Services Section -->
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
      <p class="text-xl text-gray-600">Comprehensive ICT solutions for educational institutions</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each services as service}
        <ServiceCard {service} />
      {/each}
    </div>

    <div class="text-center mt-12">
      <a href="/services" class="btn-primary">
        View All Services
      </a>
    </div>
  </div>
</section>

<!-- About Section -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">About ASIO CONSULT</h2>
        <p class="text-lg text-gray-600 mb-6">
          We are a leading provider of educational ICT solutions in Ibadan, Nigeria. 
          Our mission is to empower educational institutions with modern technology 
          and quality equipment.
        </p>
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="bg-primary-100 rounded-lg p-2 mr-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Quality Products</h3>
              <p class="text-gray-600">Carefully selected laptops and accessories</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="bg-primary-100 rounded-lg p-2 mr-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Expert Training</h3>
              <p class="text-gray-600">Professional ICT training and consultancy</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="bg-primary-100 rounded-lg p-2 mr-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Custom Software</h3>
              <p class="text-gray-600">SASR and other educational software solutions</p>
            </div>
          </div>
        </div>
      </div>
      <div class="relative">
        <img 
          src="/images/hero/about-image.svg" 
          alt="ASIO CONSULT Office"
          class="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-16 bg-primary-600">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
    <p class="text-xl text-primary-100 mb-8">
      Contact us today for quality laptops, training, and ICT solutions
    </p>
    <div class="space-x-4">
      <a href="/contact" class="bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
        Contact Us
      </a>
      <a href="/shop" class="bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-800 transition-colors duration-200">
        Shop Now
      </a>
    </div>
  </div>
</section>